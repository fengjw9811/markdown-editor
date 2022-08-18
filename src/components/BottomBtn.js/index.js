import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropsTypes from 'prop-types';

const BottomBtn = (props) => {
  const {text, color, icon, onBtnClick} = props;
  return (
    <button
      type='button'
      className={`btn btn-block no-border ${color}`}
      onClick={onBtnClick}
    >
      <FontAwesomeIcon
        size='lg'
        icon={icon}
      />
      {text}
    </button>
  );
};

BottomBtn.propsType = {
  text: PropsTypes.string,
  color: PropsTypes.string,
  icon: PropsTypes.element.isRequired,
  onBtnClick: PropsTypes.func,
};

BottomBtn.defaultProps = {
  text: '新建',
};

export default BottomBtn;
