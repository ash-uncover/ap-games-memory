import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

import './MenuStepInput.css'

interface MenuStepInputProperties {
  label: string
  min: number
  max: number
  value: number

  onChange: (arg: number) => void
}

export const MenuStepInput = ({
  label,
  min,
  max,
  value,

  onChange,
}: MenuStepInputProperties) => {

  // Hooks //

  const [currentValue, setCurrentValue] = useState(value || min || 0)

  useEffect(() => {
    if (value !== currentValue) {
      updateValue(value)
    }
  }, [value])

  const updateValue = (newValue: number) => {
    let tmpValue = newValue
    if (min && !isNaN(min) && tmpValue < min) {
      tmpValue = min
    }
    if (max && !isNaN(max) && tmpValue > max) {
      tmpValue = max
    }
    setCurrentValue(tmpValue)
    onChange(tmpValue)
  }

  // Events //

  const onValueDown = () => {
    updateValue(currentValue - 1)
  }

  const onValueUp = () => {
    updateValue(currentValue + 1)
  }

  const handleSliderClick = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clientWidth = rect.width
    const relativePosition = event.clientX - rect.left
    const newValue = Math.round(100 * relativePosition / clientWidth)
    updateValue(newValue)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateValue(Number(event.target.value))
  }

  // Rendering //

  return (
    <div className='menu-step-input'>
      <div className='container'>
        <button
          className='button'
          onClick={onValueDown}
        >
          {`<`}
        </button>
        <input
          style={{
            display: 'none'
          }}
          type='number'
          min={min}
          max={max}
          value={currentValue}
          onChange={handleChange}
        />
        <span
          className='slider'
          onClick={handleSliderClick}
        >
          <span
            className='value'
            style={{
              width: `${currentValue}%`
            }}
          />
          {currentValue}
        </span>
        <button
          className='button'
          onClick={onValueUp}
        >
          {`>`}
        </button>
      </div>
    </div>
  )
}