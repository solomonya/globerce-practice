import TLocationButtonProps from '../../scripts/@types/locationBtnProps';
import classes from './locationBtn.module.css';

function LocationBtn({ position }: TLocationButtonProps) {
  return (
    <button className={`${classes.btn} ${position}`}>
      <span className={classes.icon}></span>
      <span className={classes.label}>Алматы</span>
    </button>
  );
}

export default LocationBtn;
