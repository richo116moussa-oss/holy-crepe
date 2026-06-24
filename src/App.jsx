import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, BookOpen, Coffee, Utensils, Info } from 'lucide-react';

const InstagramIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
import { menuData } from './data';
import './index.css';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <motion.h1 
          className="logo-text text-primary"
          initial={{ scale: 1 }}
          animate={{ scale: scrolled ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          HOLY CRÊPE
        </motion.h1>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="hero container">
      <motion.div 
        className="hero-image-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/crepe_hero.png" alt="Delicious Holy Crepe" className="hero-img" />
      </motion.div>
      <motion.h2 
        className="hero-title"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Taste the Divine.
      </motion.h2>
      <motion.p 
        className="hero-subtitle"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Premium crêpes, crafted with passion.
      </motion.p>
      
      <motion.div 
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <a href="#menu" className="btn btn-primary">
          <BookOpen size={20} /> View Menu
        </a>
        <a href="https://wa.me/96181595571" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <MessageCircle size={20} /> Order Now
        </a>
      </motion.div>
    </section>
  );
};

const MenuItem = ({ name, price }) => (
  <motion.div 
    className="menu-card"
    variants={fadeInUp}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="item-name">{name}</span>
    <span className="item-price">{price}</span>
  </motion.div>
);

const AddonPill = ({ name, price }) => (
  <motion.div 
    className="addon-pill"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span>{name}</span>
    <span className="price">{price}</span>
  </motion.div>
);

const MenuSection = ({ id, title, items, children, icon: Icon }) => (
  <motion.section 
    id={id} 
    className="menu-section container"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
  >
    <motion.h3 className="category-title" variants={fadeInUp}>
      {Icon && <Icon size={28} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', color: 'var(--primary-color)' }}/>}
      {title}
    </motion.h3>
    {items && items.map((item, idx) => (
      <MenuItem key={idx} name={item.name} price={item.price} />
    ))}
    {children}
  </motion.section>
);

const FloatingActions = () => (
  <div className="floating-actions">
    <motion.a 
      href="https://wa.me/96181595571" 
      className="fab whatsapp"
      target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Order on WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.a>
    <motion.a 
      href="https://www.instagram.com/holycrepe.lb?igsh=MXZ0ZW5jeGwyaWNiMw==" 
      className="fab instagram"
      target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Follow our Journey"
    >
      <InstagramIcon size={24} />
    </motion.a>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      
      <main id="menu">
        <MenuSection id="sweets" title="Crêpes - Sweets" items={menuData.sweets} icon={Utensils} />
        
        <MenuSection id="specialities" title="Specialities" items={menuData.specialities} />
        
        <MenuSection id="salty" title="Salty" items={menuData.salty} />

        <MenuSection id="addons" title="Add ons">
          <motion.div className="addons-note" variants={fadeInUp}>
            <Info size={16} style={{display:'inline', verticalAlign:'text-bottom', marginRight:'4px'}}/>
            {menuData.addons.note}
          </motion.div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.entries(menuData.addons).filter(([k]) => k !== 'note').map(([groupName, items]) => (
              <motion.div key={groupName} className="addon-group" variants={fadeInUp} style={{width: '100%', marginBottom: '1.5rem'}}>
                <h4 className="addon-group-title text-center" style={{textAlign: 'center'}}>{groupName.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {items.map((item, idx) => (
                    <AddonPill key={idx} name={item.name} price={item.price} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </MenuSection>

        <MenuSection id="drinks" title="Drinks" icon={Coffee}>
          {Object.entries(menuData.drinks).map(([category, items]) => (
            <motion.div key={category} variants={fadeInUp} style={{ marginBottom: '1.5rem' }}>
              <h4 className="addon-group-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>{category}</h4>
              {items.map((item, idx) => (
                <MenuItem key={idx} name={item.name} price={item.price} />
              ))}
            </motion.div>
          ))}
        </MenuSection>
      </main>

      <FloatingActions />

      <footer>
        <p>&copy; {new Date().getFullYear()} HOLY CRÊPE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
