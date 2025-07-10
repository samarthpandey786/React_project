import React, { useId } from 'react'
import PropTypes from 'prop-types'  // ✅ import

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && 
            <label htmlFor={id} className=''>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((opton) => (
                    <option 
                        value={opton}
                        key={opton}
                    >
                        {opton}
                    </option>
                ))}
            </select>
        </div>
    )
}
// it is used to maintain the proper flow of the code with the exact expected data types in the props
// ✅ Prop validation
Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
}

// ✅ Forward ref
export default React.forwardRef(Select)
