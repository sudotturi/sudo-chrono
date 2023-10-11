const Footer = () => {
    return (
      <footer className="px-4 sm:px-6 py-6 mt-24">
        <div className="text-center text-sm text-gray-500">
          <span className="dark:text-gray-100 text-gray-200 font-bold text-lg mr-2">
             <a href="https://sudofolks.com" className="copy-sudo" rel="noreferrer" target="_blank" >
              Sudo Folks</a>
             

              </span> 
                &copy; {new Date().getFullYear()}<span className="tracking-wider">  All Rights Reserved
                </span> 
        </div>
      </footer>
    );
  };
  
  export default Footer;
  