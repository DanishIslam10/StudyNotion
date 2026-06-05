import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaRegClock } from "react-icons/fa"
import { HiOutlineReceiptRefund } from "react-icons/hi"
import Spinner from "../../common/Spinner"

const PurchaseHistory = () => {

  const { user } = useSelector((state) => state.profile)
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(false)

  // Replace with your actual API call
  useEffect(() => {
    // fetchPurchaseHistory().then(setPurchases)
  }, [])

  return (
    <div className="min-h-screen bg-[#000814] text-white">
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">

          {/* HEADER */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <NavLink to="/" className="transition-colors duration-200 hover:text-slate-400">Home</NavLink>
              <span>/</span>
              <NavLink to="/profile/purchase-history" className="transition-colors duration-200 hover:text-slate-400">
                Purchase History
              </NavLink>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <p className="text-xs font-medium text-indigo-300">Billing</p>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
              Purchase History
            </h1>
            <p className="text-sm text-slate-500">
              A record of all your course purchases and transactions
            </p>
          </div>

          {purchases?.length > 0 ? (
            <>
              {/* TABLE CARD */}
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                {/* TABLE HEADER */}
                <div className="hidden sm:flex items-center border-b border-white/[0.06] bg-[#111c35] px-5 py-3.5 gap-4">
                  <p className="flex-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Course</p>
                  <p className="w-[15%] text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Date</p>
                  <p className="w-[15%] text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Amount</p>
                  <p className="w-[15%] text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Status</p>
                </div>

                {/* ROWS */}
                <div className="flex flex-col divide-y divide-white/[0.04]">
                  {purchases.map((purchase, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4
                        transition-all duration-200 hover:bg-[#111c35]"
                    >
                      {/* Course info */}
                      <div className="flex flex-1 items-center gap-3 min-w-0">
                        <div className="relative shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <img
                            src={purchase?.course?.thumbnail}
                            alt={purchase?.course?.courseName}
                            className="h-14 w-20 object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0 gap-1">
                          <div className="flex w-fit items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5">
                            <div className="h-1 w-1 rounded-full bg-indigo-400" />
                            <p className="text-[10px] font-medium text-indigo-300">Course</p>
                          </div>
                          <p className="text-sm font-semibold text-white line-clamp-1 leading-snug">
                            {purchase?.course?.courseName}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {purchase?.course?.instructor?.firstName} {purchase?.course?.instructor?.lastName}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="sm:w-[15%] flex sm:justify-center">
                        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#111c35] px-3 py-1.5">
                          <FaRegClock className="text-[10px] text-slate-600" />
                          <p className="text-xs text-slate-400 whitespace-nowrap">
                            {new Date(purchase?.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit", month: "short", year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="sm:w-[15%] flex sm:justify-center">
                        <p className="text-base font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                          ₹{purchase?.amount}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="sm:w-[15%] flex sm:justify-center">
                        <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 border text-xs font-semibold
                          ${purchase?.status === "Success"
                            ? "bg-[#a6ff5e]/10 border-[#a6ff5e]/20 text-[#a6ff5e]"
                            : purchase?.status === "Pending"
                              ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}>
                          <div className={`h-1.5 w-1.5 rounded-full
                            ${purchase?.status === "Success" ? "bg-[#a6ff5e]"
                              : purchase?.status === "Pending" ? "bg-indigo-400"
                                : "bg-red-400"}`}
                          />
                          {purchase?.status ?? "Success"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUMMARY CARD */}
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

                <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#111c35] px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Total Spent</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                      ₹{purchases.reduce((sum, p) => sum + (p?.amount ?? 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#111c35] px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Courses Bought</p>
                    <p className="text-2xl font-bold text-white">{purchases.length}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#111c35] px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Last Purchase</p>
                    <p className="text-base font-semibold text-white">
                      {new Date(purchases[0]?.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (

            /* EMPTY STATE */
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

              <div className="flex flex-col items-center justify-center gap-5 py-20 text-center px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                  <HiOutlineReceiptRefund className="text-3xl text-slate-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">No purchases yet</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    You haven't made any purchases yet. Browse our courses to get started.
                  </p>
                </div>
                <NavLink to="/catalog">
                  <button className="rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
                    px-6 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300
                    hover:opacity-90 hover:scale-[1.02]">
                    Browse Courses
                  </button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory