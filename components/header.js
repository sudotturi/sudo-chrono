import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import SFBLACKFINAL from "../public/SFBLACKFINAL.svg"
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"
const Header = () => {

  const { systemTheme, theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  
  const [date, setDate] = useState("");
  useEffect(() => {
    var options = { weekday: 'long', month: 'long', day: 'numeric'};
    setDate( new Date().toLocaleDateString("en-US", options));
    const currentTheme = theme === "system" ? systemTheme : theme;
    setChecked(currentTheme == "dark");
  }, [systemTheme, theme])

  useEffect(() => {
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    setTimeout(()=>{
      setDate( new Date().toLocaleDateString("en-US", options));
    }, 1000)
  }, [date])

  const themeChange = (target) => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (target?.checked) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  };
  const { data: session, status } = useSession()
  return (
    <header className="h-15 shadow-sm ">
      <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
        <div>
          <Image alt="Sudo Folks" src={SFBLACKFINAL} width={40} />
        </div>
        <div>
          <span className="text-xs" >{date}</span>
        </div>
        <div>
          <input type="checkbox" className="sudo-toggel" id="checkbox" onClick={(e) => themeChange(e.target)} defaultChecked={checked} />
          <label htmlFor="checkbox" className="sudo-toggel-label">
            <SunIcon className="fas fa-sun" />
            <MoonIcon className="fas fa-moon" />
            <div className="ball">
            </div>
          </label>
          {!session && (
            <>
              <span >
                You are not signed in
              </span>
              <a
             
                // className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn("credentials", { username: "jsmith", password: "1234" })
                }}
              >
                Sign in
              </a>
            </>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;

