import * as React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaRegCopyright } from 'react-icons/fa';
import './footbar.css';

const Footbar = () => {
    return (
        <div className="footerPage">
            <div className="footerTop">
                <div className="footerTopLeft">
                    <div className="footerTopLeftItem">
                        <div className="footerTopLeftItemTitle">Company</div>
                        <div className="footerTopLeftItems">About</div>
                        <div className="footerTopLeftItems">Jobs</div>
                        <div className="footerTopLeftItems">For the Record</div>
                    </div>
                    <div className="footerTopLeftItem">
                        <div className="footerTopLeftItemTitle">Communities</div>
                        <div className="footerTopLeftItems">For Artists</div>
                        <div className="footerTopLeftItems">Developers</div>
                        <div className="footerTopLeftItems">Advertising</div>
                        <div className="footerTopLeftItems">Investors</div>
                        <div className="footerTopLeftItems">Vendors</div>
                    </div>
                    <div className="footerTopLeftItem">
                        <div className="footerTopLeftItemTitle">Useful links</div>
                        <div className="footerTopLeftItems">Support</div>
                        <div className="footerTopLeftItems">Free Mobile App</div>
                    </div>
                </div>
                <div className="footerTopRight">
                    <FaInstagram />
                    <FaTwitter />
                    <FaFacebook />
                </div>
            </div>
            <hr className="footerHr" />
            <div className="footerBottom">
                <div className="footerBottomLeft">
                    <a href="" className="footerBottomItem">Legal</a>
                    <a href="" className="footerBottomItem">Privacy Center</a>
                    <a href="" className="footerBottomItem">Privacy Policy</a>
                    <a href="" className="footerBottomItem">Cookies</a>
                    <a href="" className="footerBottomItem">About Ads</a>
                </div>
                <div className="footerBottomRight">
                    <FaRegCopyright />
                    <span className="copyrightText"> 2022 Spotify AB</span>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};

export default Footbar;