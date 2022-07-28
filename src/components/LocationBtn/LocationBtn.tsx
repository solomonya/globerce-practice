import classes from './locationBtn.module.css';

function LocationBtn() {
  return (
    <button className={classes.btn}>
      <span className={classes.icon}></span>
      <span className={classes.label}>Алматы</span>
    </button>
  );
}

export default LocationBtn;
