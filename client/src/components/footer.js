import React from 'react';
import DgFooterLogo from '../assets/icons/dg_footer_logo';
import FacebookIcon from '../assets/icons/facebook_icon';
import Instagram from '../assets/icons/instagram';

const Footer = () => {
    return (
        <div className='h-[250px] bg-[#9B8D6F] flex flex-row items-center justify-around mt-[40px]'>
            <div className=' flex flex-col text-[white] gap-1'>
                <a href='#' className=' text-[24px]'>OUR COMPANY</a>
                <a href='#' className=' opacity-70'>About us</a>
                <a href='#' className=' opacity-70'>Contact</a>
            </div>
            <div className=' flex flex-col text-[white] gap-1'>
                <a href='#' className=' text-[24px]'>SUPPORT</a>
                <a href='#' className=' opacity-70'>Email</a>
                <div className=' flex flex-row gap-[20px]'>
                    <a href='https://www.facebook.com/'><FacebookIcon/></a>
                    <a href='https://www.instagram.com/'><Instagram/></a>
                </div>
            </div>
            <button className="cursor-pointer"><DgFooterLogo/></button>
        </div>
    );
}

export default Footer;
