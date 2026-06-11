export function PaymentsPanel() {
  return (
    <div className="grid grid-cols-2 bg-[#6997e0] border-2 border-[#2861bd] rounded-[20px] p-[10px]">
      <div className="justify-self-center content-center bg-[#c1d6f7] border border-[#001b47] rounded-[20px] p-[10px]">
        [INSERT DEBIT OR CREDIT CARD SERVICE HERE]
      </div>
      <div className="grid grid-cols-2 bg-[#c1d6f7] border border-[#001b47] rounded-3xl p-2.5">
        <div>
          Card Number
        </div>
        <div className = "border border-solid border-[#0045b5] rounded-xl p-1 m-1 bg-[#669ffa]">
          1234 1234 1234 1234
        </div>
        <div>
          Card Holder
        </div>
        <div className = "border border-solid border-[#0045b5] rounded-xl p-1 m-1 bg-[#669ffa]">
          Jane Doe
        </div>
        <div>
          Expires On
        </div>
        <div className = "border border-solid border-[#0045b5] rounded-xl p-1 m-1 bg-[#669ffa]">
          0001/01/01
        </div>
        <div>
          CVV
        </div>
        <div className = "border border-solid border-[#0045b5] rounded-xl p-1 m-1 bg-[#669ffa]">
          000
        </div>
      </div>
    </div>
  );
}
