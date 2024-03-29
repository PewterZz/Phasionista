import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
      <li>
          <Link className="font-poppins" to={process.env.PUBLIC_URL + "/"}>
            {t("home")}
          </Link>
       </li>
       <li className="menu-item-has-children">
          <Link className="font-poppins" to={process.env.PUBLIC_URL + "/"}>{t("shop")}</Link>
          <ul className="sub-menu">
            <li className="menu-item-has-children"> 
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("shop 1")}</Link>
              <ul className="sub-menu">
                <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("product 1")}</Link>
                </li>
                <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("product 2")}</Link>
                </li>
                <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("product 3")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children"> 
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("shop 2")}</Link>
              <ul className="sub-menu">
                <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("product 1")}</Link>
                </li>
                <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("product 2")}</Link>
                </li>
                <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop"}>{t("product 3")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link className="font-poppins" to={process.env.PUBLIC_URL + "/library"}>
            {t("collection")}
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link className="font-poppins" to={process.env.PUBLIC_URL + "/"}>{t("pages")}</Link>
          <ul className="sub-menu">
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/cart"}>
                {t("cart")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/checkout"}>
                {t("checkout")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/wishlist"}>
                {t("wishlist")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/compare"}>
                {t("compare")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/my-account"}>
                {t("my_account")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/login-register"}>
                {t("login_register")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/about"}>
                {t("about_us")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/contact"}>
                {t("contact_us")}
              </Link>
            </li>
            <li>
              <Link className="font-poppins" to={process.env.PUBLIC_URL + "/404"}>
                {t("404_page")}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="font-poppins" to={process.env.PUBLIC_URL + "/about"}>
            {t("about us")}
          </Link>
        </li>
        <li>
          <Link className="font-poppins" to={process.env.PUBLIC_URL + "/orders"}>
            {t("transactions")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
