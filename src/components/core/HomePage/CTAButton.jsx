import { Link } from "react-router-dom"

const CTAButton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`
                    relative overflow-hidden rounded-xl px-7 py-3.5
                    text-sm font-semibold tracking-wide
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:-translate-y-1
                    border border-white/10
                    backdrop-blur-sm
                    shadow-lg

                    ${active
            ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]  text-black shadow-yellow-500/30"
            : "bg-white/5 text-white hover:bg-white/10 shadow-white/10"
          }
                `}
      >
        <span className="relative z-10">
          {children}
        </span>

        {/* Glow Effect */}
        <div
          className={`
                        absolute inset-0 opacity-0 transition-opacity duration-300
                        hover:opacity-100
                        ${active
              ? "bg-white/10"
              : "bg-gradient-to-r from-white/5 to-white/0"
            }
                    `}
        />
      </div>
    </Link>
  )
}

export default CTAButton