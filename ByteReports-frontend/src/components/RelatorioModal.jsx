import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Cpu, MemoryStick, HardDrive, MonitorPlay, Activity, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function RelatorioModal({ isOpen, onClose, data }) {
  const [tipo, setTipo] = useState('avancado'); 
  const [perfil, setPerfil] = useState('Trabalho Leve (Navegação, Pacote Office)');
  const reportRef = useRef();

  if (!isOpen || !data) return null;

  const perfisDisponiveis = data.diagnostico_e_sugestoes ? Object.keys(data.diagnostico_e_sugestoes) : [];
  const dicas = data.diagnostico_e_sugestoes?.[perfil] || ["Análise indisponível."];

  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Bytebros_Relatorio_${tipo}_${data.placa_mae?.modelo || 'PC'}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] w-full max-w-4xl max-h-[90vh] rounded-xl p-6 border border-gray-700 flex flex-col shadow-2xl">
        
        {/* CABEÇALHO DO MODAL */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">Exportação de Diagnóstico</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold transition">FECHAR [X]</button>
        </div>

        {/* CONTROLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button onClick={() => setTipo('simples')} className={`flex-1 py-2 rounded font-bold text-sm transition ${tipo === 'simples' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>Para Leigos (Simples)</button>
            <button onClick={() => setTipo('avancado')} className={`flex-1 py-2 rounded font-bold text-sm transition ${tipo === 'avancado' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>Para Técnicos (Avançado)</button>
          </div>
          <select 
            className="w-full bg-gray-800 p-3 rounded-lg text-white text-sm font-bold border-r-8 border-transparent outline-none" 
            value={perfil} 
            onChange={(e) => setPerfil(e.target.value)}
          >
            {perfisDisponiveis.map(p => <option key={p} value={p}>Objetivo: {p}</option>)}
          </select>
        </div>

        {/* ÁREA DO PDF (Tudo aqui dentro vai para o PDF) */}
        <div className="overflow-y-auto pr-2 pb-4">
          <div ref={reportRef} className="bg-white text-black p-10 rounded-lg">
            
            {/* Header do Relatório */}
            <div className="border-b-2 border-gray-200 pb-4 mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-blue-600 tracking-tighter">BYTEBROS.TI</h1>
                <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Relatório de Diagnóstico de Hardware</p>
              </div>
              <div className="text-right text-xs font-mono text-gray-500">
                Data: {new Date().toLocaleDateString()}<br/>
                Modo: {tipo.toUpperCase()}
              </div>
            </div>

            {/* VISÃO SIMPLES */}
            {tipo === 'simples' ? (
              <div className="space-y-6">
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-2">Visão Geral do Computador</h3>
                  <p className="text-gray-600">Este computador possui um processador <strong>{data.cpu?.nome}</strong> e <strong>{data.ram?.total_gb}GB de Memória RAM</strong>.</p>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                  <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2"><Info size={20}/> Consultoria Bytebros para: {perfil}</h3>
                  <ul className="space-y-3">
                    {dicas.map((dica, i) => (
                      <li key={i} className="text-sm text-blue-900 flex gap-2">
                        <span>•</span> {dica}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
            
            /* VISÃO AVANÇADA (DASHBOARD TÉCNICO) */
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* CPU CARD */}
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3 text-blue-600"><Cpu size={18}/><h3 className="font-bold text-sm uppercase">Processador</h3></div>
                    <p className="font-bold text-lg leading-tight mb-2">{data.cpu?.nome}</p>
                    <div className="flex justify-between text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded">
                      <span>Uso: {data.cpu?.uso_medio_porcento}%</span>
                      <span>Temp Média: {data.cpu?.temperatura_c ? `${data.cpu.temperatura_c}°C` : "N/A"}</span>
                    </div>
                  </div>

                  {/* RAM CARD */}
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3 text-purple-600"><MemoryStick size={18}/><h3 className="font-bold text-sm uppercase">Memória RAM</h3></div>
                    <p className="font-bold text-2xl leading-tight mb-2">{data.ram?.total_gb} GB</p>
                    <div className="flex justify-between text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded">
                      <span>Uso Atual: {data.ram?.uso_medio_porcento}%</span>
                    </div>
                  </div>

                  {/* GPU CARDS */}
                  {data.video?.placas?.map((gpu, i) => (
                    <div key={i} className={`border p-4 rounded-lg col-span-2 ${gpu.tipo === 'Integrada' ? 'border-cyan-200 bg-cyan-50/30' : 'border-pink-200 bg-pink-50/30'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className={`flex items-center gap-2 ${gpu.tipo === 'Integrada' ? 'text-cyan-600' : 'text-pink-600'}`}>
                          <MonitorPlay size={18}/>
                          <h3 className="font-bold text-sm uppercase">GPU {i+1}: {gpu.nome}</h3>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-1 rounded text-white ${gpu.tipo === 'Integrada' ? 'bg-cyan-500' : 'bg-pink-500'}`}>
                          {gpu.tipo.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono text-gray-600 mt-3">
                        <div className="bg-white p-2 rounded border border-gray-100">VRAM: {gpu.vram_gb}</div>
                        <div className="bg-white p-2 rounded border border-gray-100 truncate">Driver: {gpu.driver_versao}</div>
                        <div className="bg-white p-2 rounded border border-gray-100">Temp: {gpu.temperatura_c ? `${gpu.temperatura_c}°C` : 'N/A'}</div>
                      </div>
                    </div>
                  ))}

                  {/* ARMAZENAMENTO E PLACA MÃE */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                     <div className="border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3 text-orange-500"><Activity size={18}/><h3 className="font-bold text-sm uppercase">Placa Mãe</h3></div>
                        <p className="font-bold text-sm">{data.placa_mae?.modelo}</p>
                        <p className="text-xs text-gray-500 uppercase">{data.placa_mae?.fabricante}</p>
                     </div>
                     <div className="border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3 text-emerald-500"><HardDrive size={18}/><h3 className="font-bold text-sm uppercase">Armazenamento</h3></div>
                        <div className="space-y-2">
                          {data.armazenamento?.particoes?.map((p, i) => (
                            <div key={i} className="text-[10px] font-mono flex justify-between bg-gray-50 p-1 rounded">
                              <span className="font-bold text-emerald-600">DISCO {p.letra}</span>
                              <span>Uso: {p.uso_porcento}%</span>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>
                </div>

                {/* CONSULTORIA AVANÇADA */}
                <div className="mt-6 border-t-2 border-gray-900 pt-6">
                  <h3 className="text-lg font-black mb-4 uppercase">Análise de Performance: {perfil}</h3>
                  <div className="grid gap-3">
                    {dicas.map((dica, i) => {
                      const isWarning = dica.includes("⚠️");
                      const isCritical = dica.includes("CRÍTICO");
                      return (
                        <div key={i} className={`p-4 rounded-lg border flex gap-3 items-start ${isWarning || isCritical ? 'bg-red-50 border-red-200 text-red-900' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                          <div className="mt-0.5">
                            {isWarning || isCritical ? <AlertTriangle size={16} className="text-red-500"/> : <CheckCircle2 size={16} className="text-green-500"/>}
                          </div>
                          <p className="text-sm font-medium">{dica.replace("⚠️", "").replace("✅", "")}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTÃO DOWNLOAD */}
        <button onClick={downloadPDF} className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-lg font-black tracking-widest transition text-white mt-4 shadow-lg flex items-center justify-center gap-2">
          BAIXAR PDF DO RELATÓRIO
        </button>
      </div>
    </div>
  );
}