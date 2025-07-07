

// This code defines a functional React component named Container. The component is designed to wrap its child elements in a styled <div> that centers content and sets a maximum width, making it useful for consistent page layouts.

function Container({children}) { // accept the properties as a childern 
  return (
    <div className='w-full max-w-7xl mx-auto px-4 '>
      {children}
    </div>
  )
}

export default Container
