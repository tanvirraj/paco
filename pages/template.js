import toImage from 'dom-to-image'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

const Template = () => {
  const ref = useRef()
  const { query } = useRouter()
  const { title } = query

  return (
    <>
      <div ref={ref}>
        <svg height="200" viewBox="0 0 43 50" fill="#fff">
          <path d="M9.41558 50C4.56115 50 2.23885 47.3933 1.14535 45.2065C0.012987 42.9417 0 40.6797 0 40.5844V9.41558C0 9.32045 0.012987 7.05823 1.14535 4.79351C2.23885 2.60671 4.56115 0 9.41558 0H25C25.1747 0 29.3275 0.0241342 33.5182 2.11937C37.4824 4.10152 42.2078 8.32814 42.2078 17.2078C42.2078 26.0874 37.4824 30.3141 33.5182 32.2961C29.3275 34.3914 25.1747 34.4156 25 34.4156H18.8312V40.5844C18.8312 40.6797 18.8182 42.9417 17.6858 45.2065C16.5923 47.3933 14.27 50 9.41558 50ZM3.24675 40.5844C3.24686 40.5936 3.27175 42.2568 4.09307 43.8403C5.10974 45.8004 6.85076 46.7532 9.41558 46.7532C12.0175 46.7532 13.7728 45.7724 14.7817 43.7545C15.5626 42.1929 15.5844 40.6001 15.5844 40.5844V34.4825C14.1437 34.5769 11.9361 34.8047 9.76115 35.3532C5.43853 36.4434 3.24675 38.2035 3.24675 40.5844ZM17.2078 31.1688H25C25.0326 31.1687 28.649 31.1319 32.1601 29.3448C36.6728 27.0478 38.961 22.9643 38.961 17.2078C38.961 11.4104 36.6412 7.31093 32.0662 5.02348C28.5535 3.2671 25.0351 3.24675 25 3.24675H9.41558C6.81364 3.24675 5.05833 4.2276 4.04946 6.24545C3.26861 7.80714 3.24675 9.39989 3.24675 9.41558V34.6601C4.59318 33.6926 6.45996 32.8318 9.02186 32.1913C13.0654 31.1804 17.0406 31.1688 17.2078 31.1688Z" />
        </svg>

        <h1>{title || <>&nbsp;</>}</h1>

        <style jsx>{`
          div {
            width: 2024px;
            height: 1012px;
            background: #000;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          svg {
            margin-left: 10px;
            margin-bottom: 5rem;
          }
          h1 {
            font-size: 90px;
            text-align: center;
            max-width: 70%;
          }
        `}</style>
      </div>

      <button
        onClick={() => {
          if (title && ref.current) {
            toImage.toPng(ref.current).then(dataUrl => {
              fetch('/api/og', {
                method: 'POST',
                body: JSON.stringify({ image: dataUrl })
              })
                .then(res => res.text())
                .then(json => {
                  console.log(json)
                })
            })
          }
        }}
      >
        Generate Image
      </button>
    </>
  )
}

export default Template
