export default function HardwareCard({ title, icon, children, temaClaro }) {
  return (
    <div className={`p-6 rounded-xl border transition-colors flex flex-col ${
      temaClaro 
        ? 'bg-white border-gray-200 shadow-sm text-gray-800' 
        : 'bg-[#111111] border-gray-800 text-gray-100'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className={`font-black tracking-wider text-sm uppercase ${temaClaro ? 'text-gray-900' : 'text-white'}`}>
          {title}
        </h3>
      </div>
      <div className="flex-1 flex flex-col justify-end">{children}</div>
    </div>
  );
}