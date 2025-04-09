import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Acerca de Netflix',
      links: [
        { text: 'Descripción de la empresa', href: '/about' },
        { text: 'Relaciones con inversionistas', href: '/investors' },
        { text: 'Información corporativa', href: '/corporate' },
      ],
    },
    {
      title: 'Centro de ayuda',
      links: [
        { text: 'Empleo', href: '/jobs' },
        { text: 'Preferencias de cookies', href: '/cookies' },
        { text: 'Avisos legales', href: '/legal' },
      ],
    },
    {
      title: 'Términos de uso',
      links: [
        { text: 'Privacidad', href: '/privacy' },
        { text: 'Términos de uso', href: '/terms' },
        { text: 'Contáctanos', href: '/contact' },
      ],
    },
    {
      title: 'Cuenta',
      links: [
        { text: 'Mi Cuenta', href: '/account' },
        { text: 'Formas de ver', href: '/ways-to-watch' },
        { text: 'Centro de ayuda', href: '/help' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/netflix' },
    { icon: Twitter, href: 'https://twitter.com/netflix' },
    { icon: Instagram, href: 'https://instagram.com/netflix' },
    { icon: Youtube, href: 'https://youtube.com/netflix' },
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <select className="bg-transparent border border-gray-600 rounded px-2 py-1 text-sm hover:border-white transition-colors cursor-pointer">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Netflix, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;