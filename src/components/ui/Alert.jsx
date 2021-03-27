const Alert = ({ alert }) => {
  return (
    // 確保傳遞的參數 alert 不爲 null
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i>
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
