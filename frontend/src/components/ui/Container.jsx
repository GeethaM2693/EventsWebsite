export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`mx-auto max-w-[1200px] px-gutter ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
