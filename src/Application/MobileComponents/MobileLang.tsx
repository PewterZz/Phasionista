import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../Redux/currency-slice"

const MobileLangCurrChange = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector((state: any) => state.currency);

  const changeLanguageTrigger = (e: any) => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
    closeMobileMenu();
  };

  const setCurrencyTrigger = (e: any) => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="font-poppins title mb-2">Choose Language </span>
        <select  className="font-poppins"
          value={i18n.resolvedLanguage}
          onChange={changeLanguageTrigger}
        >
          <option value="en">English</option>
          <option value="fn">French</option>
          <option value="de">Germany</option>
        </select>
      </div>
      <div className="lang-curr-style">
        <span  className="font-poppins title mb-2">Choose Currency</span>
        <select className="font-poppins"
          value={currency.currencyName}
          onChange={setCurrencyTrigger}
        >
          <option  className="font-poppins" value="USD">USD</option>
          <option  className="font-poppins" value="EUR">EUR</option>
          <option  className="font-poppins"value="GBP">GBP</option>
        </select>
      </div>
    </div>
  );
};

export default MobileLangCurrChange;
