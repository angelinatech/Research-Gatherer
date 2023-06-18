import logo from './img/logo.png'
import picture from './img/picture.png'
import './SkeletonBox.css'



// *~*~*~*~*~*~ just returns the dummy wikipedia page ~*~*~*~*~*~*

function SkeletonBox() {

    return (<>

<div className="wikiFrame">
           
            <div className="sidebar">
                <div className="logo"><img src={logo} alt="Logo" /></div>
                    <ul>
                        <li><a>*~*~ *~*~</a></li>
                        <li><a>*~*~*~*~</a></li>
                        <li><a>*~*~*~*~ </a></li>
                    </ul>
                    <h3>*~*~*~*~*~*</h3>
                    <ul>
                        <li><a>*~*~</a></li>
                        <li><a>*~*~*</a></li>
                        <li><a>*~*~*~</a></li>
                    </ul>
                    <h3>*~*~*~*~*~*</h3>
                    <ul>
                        <li><a>*~*~</a></li>
                        <li><a>*~*~*</a></li>
                        <li><a>*~*~*</a></li>
                    </ul>
            </div>



            <div className="mainSection">
                
                <div className="headerLinks"><span className="user">*~* *~*~*~ *~</span> <a>*~*~*~*~*~*~</a> <a>*~*~*~ *~*</a> <a>*~* ~* </a></div>
                
                <div className="tabs">
                    <div id="simpleSearch">
                        <input type="text" name="searchInput" id="searchInput" placeholder=" " size="12" />
                        <div id="submitSearch"></div>
                    </div>
                    <div className="tabsRight">
                        <ul>
                            <li><a> *~*~ </a></li>
                            <li><a> ~*~*~ *~* </a></li>
                            <li><a> ~*~*~ *~ </a></li>
                        </ul>
                    </div>

                </div>


                <div className="article">
                    <h1>Content Loading</h1>
                    <p className="siteSub">From Wikipedia, the free encyclopedia</p>
                    <p className="roleNote">*~*~ *~*~*~* *~ *~*~ *~* ~*~*~*~ *~*~*~*~*. *~* ~*~*~ *~*~, *~* ~*~*~ (*~*~*~*~*~*~*~).</p>

                    <div className="articleRight">
                        <div className="articleRightInner"><img src={picture} alt="picture loading" className="examplePic" /></div>
                        *~*~ *~ * ~*~* <a>picture</a>
                    </div>

                    <p>*~*~* ~*~*~ *~*~ *~* ~*~*, ~*~*~*~ *~*~*~*~*~ *~* ~*, ~* ~*~* ~*~*~*~ *~*. ~*~*~ *~*~*~* ~*~*~*~ *~* ~*. ~*~*~* ~*~*~*~*~*~ *~ *~*, ~*~* ~*~*~*~* ~*~*~*~*~*~ *~* ~*. ~* ~*~ *~*~* ~*~*~*~*, ~*~ *~ *~*~*~ *~*~*~*~. *~*~ *~*~*~* ~*~ *~, *~*~*~ *~*~*~*~*~*~ *~* ~*. ~* ~*~ *~*~* ~*~*~*~, *~*~*~* ~*~*~*~*~ *~*~*~*~*~ *~* ~*.</p>
                    <p>*~* ~*~*~* ~*~*~*~*~* ~*, ~* ~*~*~ *~*~*~ *~*. ~*~ *~*~ *~*~* ~*~*~* ~*, ~*~*~*~ *~*~*~* ~* ~*~. *~* ~*~*~*~* ~*~*~*~*~* ~*. ~*~*~ *~*~*~ *~*~*~*~*~ *~ *~*, ~* ~*~ *~*~*~ *~*~*~. *~* ~* ~*~* ~*~*~*~, *~* ~* ~*~*~* ~*~*~*~*.</p>
                    
                  </div>
        </div>
</div>
    </>)


}

export default SkeletonBox