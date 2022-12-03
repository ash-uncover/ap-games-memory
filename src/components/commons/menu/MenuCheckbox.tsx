import React, { FormEvent, useState } from 'react'
// Libs
import { UUID } from '@uncover/js-utils'

interface MenuCheckboxProperties {
  checked: boolean
  label: string
  onChange: (arg: boolean) => void
}

const MenuCheckbox = ({
  checked,
  label,
  onChange,
}: MenuCheckboxProperties) => {

  // Hooks //

  const [id] = useState<string>(`menu-checkbox-${UUID.next()}`)

  // Events //

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked)
  }

  // Rendering //

  return (
    <div className='menu-checkbox'>
      <input
        id={id}
        type='checkbox'
        name={label}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default MenuCheckbox