/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveToBottom: {
          '0%': {
            top: '-100%'
          },
          '100%': {
            top: '0'
          },
        },
        scaleX: {
          'to': {
            transform: 'scaleX(0)'
          },
          'from': {
            tramsform: 'scaleX(1)'
          }
        }
      },
      colors: {
        modal: 'rgba(0, 0, 0, 0.3)',
        yellowFooter: '#ede734',
        grayFooter: '#282c31',
        textColor2: '#D3D7DA',
        newYellow: '#F5F5E5',
        newGray: '#eceff1'
      },
      animation: {
        'toBottom': 'moveToBottom .4s linear',
        'navbarBorderHover': 'scaleX .3s linear'
      },
      backgroundImage: {
        'home-hero-1': "url('https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enVN/Images/sustainability-ss23-mftp-launch-onsite-hp-mh-d_tcm212-1019016.jpg')",
        'home-hero-2': "url('https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/enVN/Images/strength-d_tcm212-1028851.jpg')",
      },
      boxShadow: {
        'shadow1': '0 12px 24px #0000001a',
      }
    },
  },
  plugins: [],
}

