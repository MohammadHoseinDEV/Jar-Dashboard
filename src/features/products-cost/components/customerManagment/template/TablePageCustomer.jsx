import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { toShamsi } from '../../../../../Time/date';
import ReportActionCustomer from '../module/ReportActionCustomer';
import DeactiveCustomer from './DeactiveCustomer';

function TablePageCustomer({
  filterData,
  canEdit,
  canDelete,
  openEdit,
  askDelete,
  setOpenFormReport,
  setSelectedCustomer,
}) {
  const [openDeactiveCustomer, setOpenDeactivecustomer] = useState(false);
  return (
    <div>
      <table className="w-full border-separate border-spacing-y-0 max-md:hidden">
        <thead className="bg-[#0b0c12] text-white/70">
          <tr className="5xl:text-[25px] max-2xl:text-[12px]">
            <th className="5xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
              ردیف
            </th>
            <th className="border-t border-b border-white/30">کد مشتری</th>
            <th className="border-t border-b border-white/30">نام مشتری</th>

            <th className="border-t border-b border-white/30">
              تاریخ ثبت مشتری
            </th>

            <th className="5xl:w-70 w-55 border-t border-b border-white/30 max-2xl:w-50">
              وضعیت
            </th>

            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData?.map((e, index) => (
            <tr key={e.id} className="text-center">
              <td className="size-5 border-b border-white/20">
                <p className="5xl:text-[20px] my-3 mr-5 rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70 max-2xl:text-[12px]">
                  {index + 1}
                </p>
              </td>
              <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                <p className="mx-1 rounded-[10px] border border-[#32a3de]/40 bg-[#182228] font-[AvenirLTProBook] text-[#32a3de]">
                  {e?.customerCode}
                </p>
              </td>
              <td className="5xl:text-[28px] border-b border-white/20 text-white max-2xl:text-[12px]">
                {e?.customerName}
              </td>
              <td className="5xl:text-[28px] flex items-center justify-center border-b border-white/20 py-5 font-[AvenirLTProBook] text-white max-2xl:text-[12px]">
                <p className="5xl:text-[30px] pl-2 text-[20px] text-[#863515] max-2xl:text-[15px]">
                  <FiCalendar />
                </p>

                {toShamsi(e?.createdDate)}
              </td>

              <td className="5xl:text-[30px] border-b border-white/20 max-2xl:text-[12px]">
                {(() => {
                  if (e?.isActive === true) {
                    return (
                      <p
                        onClick={() => {
                          setOpenDeactivecustomer(e);
                        }}
                        className="cursor-pointer rounded-[10px] bg-[#1b4025]/50 py-1 text-[#3cbb30]"
                      >
                        فعال
                      </p>
                    );
                  }
                  if (e?.isActive === false) {
                    return (
                      <p className="5xl:py-2 rounded-[10px] border bg-[#cc1111]/30 py-1 text-[#eb0808]">
                        غیرفعال
                      </p>
                    );
                  }
                })()}
              </td>
              <td className="border-b border-white/20">
                <ReportActionCustomer
                  report={e}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  openEdit={openEdit}
                  askDelete={askDelete}
                  setOpenFormReport={setOpenFormReport}
                  setSelectedCustomer={setSelectedCustomer}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeactiveCustomer
        openDeactiveCustomer={openDeactiveCustomer}
        setOpenDeactivecustomer={setOpenDeactivecustomer}
      />
    </div>
  );
}

export default TablePageCustomer;
