import { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    // 確保傳遞的參數 alert 不爲 null
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i>
        &nbsp;
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
