import Chip from '@mui/material/Chip';

const BasicChips = ({label, variant, size, className}) => {
  return (
    <Chip label={label} variant={variant} size={size} className={className} />
    // test for github
  )
}

export default BasicChips