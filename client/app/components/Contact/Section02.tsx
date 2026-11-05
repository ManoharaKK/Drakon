"use client";

import React, { useState } from 'react'

const COUNTRY_CODES = [
  { code: '+94', country: 'LK', label: '🇱🇰 +94' },
  { code: '+1', country: 'US', label: '🇺🇸 +1' },
  { code: '+44', country: 'GB', label: '🇬🇧 +44' },
  { code: '+61', country: 'AU', label: '🇦🇺 +61' },
  { code: '+91', country: 'IN', label: '🇮🇳 +91' },
  { code: '+971', country: 'AE', label: '🇦🇪 +971' },
  { code: '+65', country: 'SG', label: '🇸🇬 +65' },
  { code: '+966', country: 'SA', label: '🇸🇦 +966' },
  { code: '+974', country: 'QA', label: '🇶🇦 +974' },
  { code: '+49', country: 'DE', label: '🇩🇪 +49' },
  { code: '+33', country: 'FR', label: '🇫🇷 +33' },
  { code: '+81', country: 'JP', label: '🇯🇵 +81' },
];

function Section02() {
  const [countryCode, setCountryCode] = useState('+94');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [touched, setTouched] = useState(false);

  const validatePhoneNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (!value.trim()) {
      return 'Phone number is required';
    }
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return 'Please enter a valid phone number (7 to 15 digits)';
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (touched) {
      setPhoneError(validatePhoneNumber(val));
    }
  };

  const handlePhoneBlur = () => {
    setTouched(true);
    setPhoneError(validatePhoneNumber(phone));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const error = validatePhoneNumber(phone);
    setTouched(true);
    if (error) {
      e.preventDefault();
      setPhoneError(error);
    }
  };

  return (
    <div className='relative z-10 bg-black pt-26 lg:pt-30'>
      <div className='container-global'>
        <h1 className='title uppercase  max-w-[95%] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[500px] 2xl:max-w-[900px] '>
          REACH THE DRAKON. LET'S BUILD YOUR MYTH TOGETHER
        </h1>
      </div>
      <div className='container-global'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-end'>
          <div className='col-span-1 lg:col-span-1'>

            <p className='description mt-4 lg:mr-24 lg:mt-8'>
              Got a question about equipment, coaching, or training? We're here to help you every step of the way.
            </p>
            <div className='bg-white/50 h-[1px] w-full my-10'></div>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 mt-8'>
              <div className='col-span-1 lg:col-span-3 overflow-hidden'>
                <video
                  className='w-full h-full object-cover'
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src='/videos/home/Hero.mp4' type='video/mp4' />
                </video>
              </div>
              <div className='col-span-1 lg:col-span-2 overflow-hidden'>
                <img
                  src='/images/hero/Heria.jpg'
                  alt='Contact'
                  width={1000}
                  height={1000}
                  className='w-full h-[300px] sm:h-[500px] lg:h-[600px] object-cover'
                />
              </div>
            </div>
          </div>
          <div className='col-span-1 lg:col-span-1 mt-8 lg:mt-0'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              {/* Name */}
              <div className='space-y-2'>
                <label htmlFor='name' className='block text-sm font-medium text-white'>
                  Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Enter your name'
                  className='w-full  bg-white/10 px-6 py-3 text-sm text-white outline-none border border-white/10 placeholder:text-white/60 focus:border-secondary transition-all'
                />
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm font-medium text-white'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email'
                  className='w-full  bg-white/10 px-6 py-3 text-sm text-white outline-none border border-white/10 placeholder:text-white/60 focus:border-secondary transition-all'
                />
              </div>

              {/* Purpose of Inquiry */}
              <div className='space-y-2'>
                <label htmlFor='inquiryPurpose' className='block text-sm font-medium text-white'>
                  Purpose of Inquiry
                </label>
                <select
                  id='inquiryPurpose'
                  name='inquiryPurpose'
                  className='w-full bg-white text-black rounded-none px-6 py-3 text-sm outline-none border border-white focus:border-white appearance-none transition-all cursor-pointer'
                  defaultValue=''
                >
                  <option value='' disabled className='bg-white text-black/60'>
                    Select purpose of inquiry
                  </option>
                  <option value='general' className='bg-white text-black'>
                    General Inquiry
                  </option>
                  <option value='product' className='bg-white text-black'>
                    Product Question (Equipment/Apparel/Nutrition)
                  </option>
                  <option value='order_shipping' className='bg-white text-black'>
                    Order/Shipping Issue
                  </option>
                  <option value='coaching' className='bg-white text-black'>
                    Coaching Inquiry
                  </option>
                  <option value='partnership' className='bg-white text-black'>
                    Brand Partnership/Collaboration
                  </option>
                  <option value='bulk' className='bg-white text-black'>
                    Bulk/Wholesale Order
                  </option>
                  <option value='feedback' className='bg-white text-black'>
                    Feedback/Complaint
                  </option>
                </select>
              </div>

              {/* Phone */}
              <div className='space-y-2'>
                <label htmlFor='phone' className='block text-sm font-medium text-white'>
                  Phone Number <span className='text-red-400'>*</span>
                </label>
                <div className='flex gap-2 items-stretch'>
                  {/* Country Selector */}
                  <select
                    id='countryCode'
                    name='countryCode'
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className='bg-white text-black rounded-none px-3 py-3 text-sm outline-none border border-white focus:border-white appearance-none cursor-pointer w-[110px] shrink-0 font-medium'
                    aria-label="Select Country Code"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code + c.country} value={c.code} className='bg-white text-black'>
                        {c.label}
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <div className='relative flex-1'>
                    <input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      placeholder='e.g. 0754947171'
                      className={`w-full bg-white/10 px-6 py-3 text-sm text-white outline-none border ${phoneError && touched ? 'border-red-500' : 'border-white/10 focus:border-white'
                        } placeholder:text-white/60 transition-all`}
                      required
                    />
                  </div>
                </div>
                {phoneError && touched && (
                  <p className='text-xs text-red-400 mt-1 font-medium'>{phoneError}</p>
                )}

              </div>

              {/* Message */}
              <div className='space-y-2'>
                <label htmlFor='message' className='block text-sm font-medium text-white'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={5}
                  placeholder='Tell us about your project'
                  className='w-full  bg-white/10 px-6 py-3 text-sm text-white outline-none border border-white/10 placeholder:text-white/60 focus:border-secondary transition-all resize-none'
                />
              </div>

              {/* Submit */}
              <button
                type='submit'
                className='w-full bg-white text-black border border-white py-3 text-sm font-semibold shadow-md hover:bg-black hover:text-white hover:border-white transition-all duration-300 cursor-pointer uppercase'
              >
                Submit
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Section02