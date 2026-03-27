import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button'
import Logo from '../shared/Logo'
import { sendLeadWebhook } from '../../hooks/useWebhook'

const businessTypes = [
  'Chiropractor',
  'Dentist',
  'Med Spa / Aesthetics',
  'Home Services (HVAC, Plumbing, Electrical, Roofing)',
  'Law Firm',
  'Auto Repair / Body Shop',
  'Real Estate',
  'Veterinarian',
  'Salon / Barbershop',
  'Fitness / Gym / Personal Training',
  'Accounting / Financial Services',
  'Other Service Business',
]

const revenueOptions = [
  'Under $10,000',
  '$10,000 to $25,000',
  '$25,000 to $50,000',
  '$50,000 to $100,000',
  '$100,000 to $250,000',
  '$250,000+',
]

const employeeOptions = [
  'Just me (solo operator)',
  '2 to 5',
  '6 to 10',
  '11 to 25',
  '26 to 50',
  '50+',
]

export default function IntakeForm({ onSubmit }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    full_name: '',
    business_name: '',
    email: '',
    phone: '',
    business_type: '',
    monthly_revenue: '',
    employee_count: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.full_name.trim()) errs.full_name = 'Required'
    if (!form.business_name.trim()) errs.business_name = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!form.business_type) errs.business_type = 'Required'
    if (!form.monthly_revenue) errs.monthly_revenue = 'Required'
    if (!form.employee_count) errs.employee_count = 'Required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    sendLeadWebhook(form)
    onSubmit(form)
    navigate('/evaluate')
  }

  const inputClass = (field) =>
    `w-full bg-navy-700 border ${errors[field] ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors`

  const selectClass = (field) =>
    `w-full bg-navy-700 border ${errors[field] ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors appearance-none`

  return (
    <div className="min-h-screen bg-navy-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Logo />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
            Tell Us About Your Business
          </h1>
          <p className="text-gray-400 mb-8">
            We use this to customize your scorecard results and AI recommendations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className={inputClass('full_name')}
                />
                {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Business Name</label>
                <input
                  type="text"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange}
                  placeholder="Smith Dental"
                  className={inputClass('business_name')}
                />
                {errors.business_name && <p className="text-red-400 text-xs mt-1">{errors.business_name}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@smithdental.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Business Type / Vertical</label>
              <div className="relative">
                <select name="business_type" value={form.business_type} onChange={handleChange} className={selectClass('business_type')}>
                  <option value="">Select your industry...</option>
                  {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {errors.business_type && <p className="text-red-400 text-xs mt-1">{errors.business_type}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Approximate Monthly Revenue</label>
                <div className="relative">
                  <select name="monthly_revenue" value={form.monthly_revenue} onChange={handleChange} className={selectClass('monthly_revenue')}>
                    <option value="">Select range...</option>
                    {revenueOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.monthly_revenue && <p className="text-red-400 text-xs mt-1">{errors.monthly_revenue}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Number of Employees</label>
                <div className="relative">
                  <select name="employee_count" value={form.employee_count} onChange={handleChange} className={selectClass('employee_count')}>
                    <option value="">Select range...</option>
                    {employeeOptions.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.employee_count && <p className="text-red-400 text-xs mt-1">{errors.employee_count}</p>}
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full">
                Start My Evaluation
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
