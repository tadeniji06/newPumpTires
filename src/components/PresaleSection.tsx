import { useState } from 'react';
import { useAccount, useBalance, useSendTransaction, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { Rocket, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { recieveWallet } from '../config';

// USDC token contract address on PulseChain (bridged from Ethereum)
const USDC_CONTRACT = '0x15d38573d2feeb82e7ad5187ab8c1d52810b1f07';

// ERC20 ABI for token transfer
const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const;

type PaymentType = 'usdc' | 'pls';

const PresaleSection = () => {
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState<PaymentType>('usdc');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { address, isConnected } = useAccount();

  // Get PLS balance
  const { data: plsBalance } = useBalance({
    address: address,
  });

  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address: address,
    token: USDC_CONTRACT,
  });

  // For native PLS transfers
  const { 
    data: plsHash, 
    isPending: isPlsPending,
    sendTransaction 
  } = useSendTransaction();

  // For USDC token transfers
  const { 
    data: usdcHash,
    isPending: isUsdcPending,
    writeContract 
  } = useWriteContract();

  // Wait for PLS transaction
  const { isLoading: isPlsConfirming, isSuccess: isPlsSuccess } = 
    useWaitForTransactionReceipt({ hash: plsHash });

  // Wait for USDC transaction
  const { isLoading: isUsdcConfirming, isSuccess: isUsdcSuccess } = 
    useWaitForTransactionReceipt({ hash: usdcHash });

  const isPending = isPlsPending || isUsdcPending;
  const isConfirming = isPlsConfirming || isUsdcConfirming;
  const isTransactionSuccess = isPlsSuccess || isUsdcSuccess;

  // Minimum purchase amounts
  const MIN_USDC = 10;
  const MIN_PLS = 500000;

  const validateAmount = (value: string): boolean => {
    setError('');
    setSuccess(false);

    if (!value || parseFloat(value) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    const numAmount = parseFloat(value);

    if (paymentType === 'usdc') {
      if (numAmount < MIN_USDC) {
        setError(`Minimum purchase is ${MIN_USDC} USDC`);
        return false;
      }

      const balance = usdcBalance ? parseFloat(formatUnits(usdcBalance.value, 6)) : 0;
      if (numAmount > balance) {
        setError('Insufficient USDC balance');
        return false;
      }
    } else {
      if (numAmount < MIN_PLS) {
        setError(`Minimum purchase is ${MIN_PLS.toLocaleString()} PLS`);
        return false;
      }

      const balance = plsBalance ? parseFloat(formatUnits(plsBalance.value, 18)) : 0;
      if (numAmount > balance) {
        setError('Insufficient PLS balance');
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!validateAmount(amount)) {
      return;
    }

    try {
      setError('');
      setSuccess(false);

      if (paymentType === 'usdc') {
        // Send USDC tokens
        const amountInWei = parseUnits(amount, 6); // USDC has 6 decimals

        writeContract({
          address: USDC_CONTRACT,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [recieveWallet as `0x${string}`, amountInWei],
        });
      } else {
        // Send native PLS
        const amountInWei = parseUnits(amount, 18); // PLS has 18 decimals

        sendTransaction({
          to: recieveWallet as `0x${string}`,
          value: amountInWei,
        });
      }
    } catch (err: any) {
      console.error('Transaction error:', err);
      setError(err?.message || 'Transaction failed. Please try again.');
    }
  };

  // Show success message when transaction is confirmed
  if (isTransactionSuccess && !success) {
    setSuccess(true);
    setAmount('');
    setTimeout(() => setSuccess(false), 5000);
  }

  const getButtonText = () => {
    if (!isConnected) return 'Connect Wallet First';
    if (isPending) return 'Confirming...';
    if (isConfirming) return 'Processing...';
    return `Buy with ${paymentType === 'usdc' ? 'USDC' : 'PLS'}`;
  };

  return (
    <section className='space-y-6 border border-gray-800 bg-[#111111] rounded-xl p-6 md:p-10'>
      <h2 className='text-2xl font-semibold flex items-center gap-2'>
        <Rocket className='w-6 h-6 text-primary-green' />
        <span className='text-primary-green'>Join the Presale</span>
      </h2>

      <div className='space-y-4'>
        {/* Payment Type Selection */}
        <div>
          <label className='block text-sm text-gray-400 mb-2'>
            Select Payment Method
          </label>
          <div className='grid grid-cols-2 gap-3'>
            <button
              onClick={() => {
                setPaymentType('usdc');
                setError('');
                setAmount('');
              }}
              className={`p-4 rounded-lg border-2 transition ${
                paymentType === 'usdc'
                  ? 'border-primary-green bg-primary-green/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className='font-semibold'>USDC</div>
              <div className='text-sm text-gray-400'>Min: ${MIN_USDC}</div>
              {usdcBalance && (
                <div className='text-xs text-gray-500 mt-1'>
                  Balance: {parseFloat(formatUnits(usdcBalance.value, 6)).toFixed(2)}
                </div>
              )}
            </button>

            <button
              onClick={() => {
                setPaymentType('pls');
                setError('');
                setAmount('');
              }}
              className={`p-4 rounded-lg border-2 transition ${
                paymentType === 'pls'
                  ? 'border-primary-green bg-primary-green/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className='font-semibold'>PLS</div>
              <div className='text-sm text-gray-400'>
                Min: {MIN_PLS.toLocaleString()}
              </div>
              {plsBalance && (
                <div className='text-xs text-gray-500 mt-1'>
                  Balance: {parseFloat(formatUnits(plsBalance.value, 18)).toFixed(0)}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className='block text-sm text-gray-400 mb-2'>
            Amount ({paymentType === 'usdc' ? 'USDC' : 'PLS'})
          </label>
          <input
            type='number'
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            placeholder={`Min: ${paymentType === 'usdc' ? MIN_USDC : MIN_PLS.toLocaleString()}`}
            className='w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-green transition'
            disabled={!isConnected || isPending || isConfirming}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className='flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400'>
            <AlertCircle className='w-5 h-5 flex-shrink-0' />
            <p className='text-sm'>{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className='flex items-center gap-2 p-3 bg-primary-green/10 border border-primary-green/30 rounded-lg text-primary-green'>
            <CheckCircle2 className='w-5 h-5 flex-shrink-0' />
            <p className='text-sm'>Transaction successful! Thank you for participating.</p>
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={handlePayment}
          disabled={!isConnected || isPending || isConfirming || !amount}
          className='w-full px-8 py-4 bg-primary-green text-black font-semibold rounded-lg hover:opacity-80 transition shadow-[0_0_15px_-5px_rgba(52,208,127,0.7)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {(isPending || isConfirming) && (
            <Loader2 className='w-5 h-5 animate-spin' />
          )}
          {getButtonText()}
        </button>

        {/* Transaction Hash */}
        {(plsHash || usdcHash) && (
          <div className='text-sm text-gray-400 text-center'>
            <a
              href={`https://scan.pulsechain.com/tx/${plsHash || usdcHash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary-green hover:underline'
            >
              View transaction on explorer →
            </a>
          </div>
        )}

        {/* Info */}
        <div className='text-xs text-gray-500 space-y-1 pt-2'>
          <p>• Tokens will be delivered after presale ends</p>
          <p>• Liquidity will be added immediately after presale</p>
          <p>• Receiving address: {recieveWallet.slice(0, 6)}...{recieveWallet.slice(-4)}</p>
        </div>
      </div>
    </section>
  );
};

export default PresaleSection;