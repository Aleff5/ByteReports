import { useState, useEffect, useCallback, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Cpu, MemoryStick, HardDrive, MonitorPlay, Activity, Loader2, Info, AlertTriangle, CheckCircle2, Globe, Battery, BatteryCharging, Monitor, Wrench, ShieldCheck, PenTool, HelpCircle, Copy, FileText, Settings, BookOpen, Info as InfoIcon, Sliders, Download, ArrowRight, Phone, Link } from 'lucide-react';
import HardwareCard from './components/HardwareCard';

const getPalette = (modo) => {
  switch (modo) {
    case 'protanopia': 
      return { 
        okText: 'text-blue-500', okBg: 'bg-blue-500', okBorder: 'border-blue-200', okLightBg: 'bg-blue-50', 
        warnText: 'text-yellow-600', warnBg: 'bg-yellow-500', warnBorder: 'border-yellow-200', warnLightBg: 'bg-yellow-50', 
        critText: 'text-yellow-600', critBg: 'bg-yellow-600', critBorder: 'border-yellow-300', critLightBg: 'bg-yellow-100' 
      };
    case 'deuteranopia': 
      return { 
        okText: 'text-blue-500', okBg: 'bg-blue-500', okBorder: 'border-blue-200', okLightBg: 'bg-blue-50', 
        warnText: 'text-orange-500', warnBg: 'bg-orange-500', warnBorder: 'border-orange-200', warnLightBg: 'bg-orange-50', 
        critText: 'text-orange-600', critBg: 'bg-orange-600', critBorder: 'border-orange-300', critLightBg: 'bg-orange-100' 
      };
    default: 
      return { 
        okText: 'text-emerald-500', okBg: 'bg-emerald-500', okBorder: 'border-green-200', okLightBg: 'bg-green-50', 
        warnText: 'text-amber-500', warnBg: 'bg-amber-500', warnBorder: 'border-amber-200', warnLightBg: 'bg-amber-50', 
        critText: 'text-red-500', critBg: 'bg-red-500', critBorder: 'border-red-200', critLightBg: 'bg-red-50' 
      };
  }
};

function InfoTooltip({ texto, temaClaro }) {
  return (
    <div className="group relative inline-flex items-center gap-1 mb-4 z-10">
      <div className={`cursor-help transition-colors flex items-center gap-1 ${temaClaro ? 'text-gray-500 hover:text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}>
        <HelpCircle size={14} />
        <span className="text-[10px] uppercase font-black tracking-wider">O que é isso?</span>
      </div>
      <div className={`absolute left-0 top-full mt-2 w-64 border text-xs p-3 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none leading-relaxed z-50 ${temaClaro ? 'bg-white border-gray-200 text-gray-700' : 'bg-[#1a1a1a] border-gray-700 text-gray-300'}`}>
        {texto}
      </div>
    </div>
  );
}

function UpgradeModal({ isOpen, onClose, temaClaro }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden relative ${temaClaro ? 'bg-white border-gray-300' : 'bg-[#111111] border-gray-800'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold transition">FECHAR [X]</button>
        
        <div className={`p-8 text-center border-b ${temaClaro ? 'bg-blue-50 border-blue-100' : 'bg-blue-900/10 border-blue-900/30'}`}>
          <Wrench size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className={`text-3xl font-black mb-2 ${temaClaro ? 'text-gray-900' : 'text-white'}`}>Potencialize sua Máquina!</h2>
          <p className={`text-sm max-w-md mx-auto ${temaClaro ? 'text-gray-600' : 'text-gray-400'}`}>
            Por que sofrer com travamentos ou lentidão? Um simples upgrade de RAM ou a instalação de um SSD NVMe pode fazer o seu computador voar e garantir anos a mais de vida útil.
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className={`text-lg font-bold uppercase tracking-wider ${temaClaro ? 'text-gray-800' : 'text-gray-200'}`}>Fale com os nossos Especialistas</h3>
            
            <a href="https://wa.me/5561999144748" target="_blank" rel="noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition cursor-pointer border ${temaClaro ? 'hover:bg-green-50 border-gray-200' : 'hover:bg-emerald-900/20 border-gray-800'}`}>
              <div className="bg-emerald-500 p-3 rounded-lg text-white shadow-lg"><Phone size={24}/></div>
              <div>
                <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">WhatsApp / Suporte</p>
                <p className={`font-bold text-lg ${temaClaro ? 'text-gray-900' : 'text-white'}`}>(61) 99914-4748</p>
              </div>
            </a>

            <a href="https://instagram.com/bytebros.ti" target="_blank" rel="noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition cursor-pointer border ${temaClaro ? 'hover:bg-pink-50 border-gray-200' : 'hover:bg-pink-900/20 border-gray-800'}`}>
              <div className="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-3 rounded-lg text-white shadow-lg"><Link size={24}/></div>
              <div>
                <p className="text-[10px] font-black uppercase text-pink-500 tracking-widest">Siga nosso Trabalho</p>
                <p className={`font-bold text-lg ${temaClaro ? 'text-gray-900' : 'text-white'}`}>@bytebros.ti</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigModal({ isOpen, onClose, temaClaro, setTemaClaro, modoDaltonismo, setModoDaltonismo }) {
  const [activeTab, setActiveTab] = useState('config');
  const pdfManualRef = useRef();
  const paleta = getPalette(modoDaltonismo);

  if (!isOpen) return null;

  const baixarManualPDF = async () => {
    if (!pdfManualRef.current) return;
    const canvas = await html2canvas(pdfManualRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Manual_do_Usuario_ByteReports.pdf');
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl h-[85vh] rounded-xl border flex flex-col shadow-2xl overflow-hidden ${temaClaro ? 'bg-white border-gray-300' : 'bg-[#111111] border-gray-700'}`}>
        
        <div className={`flex justify-between items-center p-6 border-b ${temaClaro ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-[#0a0a0a]'}`}>
          <h2 className={`text-2xl font-black flex items-center gap-2 ${temaClaro ? 'text-gray-900' : 'text-white'}`}>
            <Settings size={24} className="text-blue-500" /> Central do Sistema
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 font-bold transition">FECHAR [X]</button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className={`w-64 border-r p-4 flex flex-col gap-2 ${temaClaro ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-[#0a0a0a]'}`}>
            <button onClick={() => setActiveTab('config')} className={`flex items-center gap-3 p-3 rounded-lg font-bold text-sm transition ${activeTab === 'config' ? 'bg-blue-600 text-white' : (temaClaro ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-400 hover:bg-gray-800')}`}>
              <Sliders size={18} /> Configurações
            </button>
            <button onClick={() => setActiveTab('manual')} className={`flex items-center gap-3 p-3 rounded-lg font-bold text-sm transition ${activeTab === 'manual' ? 'bg-blue-600 text-white' : (temaClaro ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-400 hover:bg-gray-800')}`}>
              <BookOpen size={18} /> Manual do Usuário
            </button>
            <button onClick={() => setActiveTab('sobre')} className={`flex items-center gap-3 p-3 rounded-lg font-bold text-sm transition ${activeTab === 'sobre' ? 'bg-blue-600 text-white' : (temaClaro ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-400 hover:bg-gray-800')}`}>
              <InfoIcon size={18} /> Sobre o Sistema
            </button>
          </div>

          <div className={`flex-1 p-8 overflow-y-auto ${temaClaro ? 'text-gray-800' : 'text-gray-300'}`}>
            
            {activeTab === 'config' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <h3 className="text-xl font-black mb-6 uppercase tracking-wider text-blue-500">Aparência e Acessibilidade</h3>
                
                <div className="space-y-4">
                  <label className="block font-bold">Tema da Interface:</label>
                  <div className="flex gap-4">
                    <button onClick={() => setTemaClaro(false)} className={`flex-1 p-4 rounded-lg border font-bold transition ${!temaClaro ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-gray-600 hover:border-gray-400'}`}>Modo Escuro</button>
                    <button onClick={() => setTemaClaro(true)} className={`flex-1 p-4 rounded-lg border font-bold transition ${temaClaro ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-600 hover:border-gray-400'}`}>Modo Claro</button>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-700">
                  <label className="block font-bold">Filtro de Daltonismo (Cores Acessíveis):</label>
                  <p className="text-xs text-gray-500 mb-2">Ajusta os gráficos do sistema para combinações de Azul/Amarelo ou Azul/Laranja, garantindo legibilidade total dos alertas.</p>
                  <select 
                    value={modoDaltonismo} 
                    onChange={(e) => setModoDaltonismo(e.target.value)}
                    className={`w-full p-4 rounded-lg font-bold border outline-none ${temaClaro ? 'bg-white border-gray-300 text-gray-900' : 'bg-[#1a1a1a] border-gray-600 text-white'}`}
                  >
                    <option value="nenhum">Padrão (Desativado)</option>
                    <option value="protanopia">Protanopia (Dificuldade com Vermelho)</option>
                    <option value="deuteranopia">Deuteranopia (Dificuldade com Verde)</option>
                  </select>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-700">
                  <h3 className="text-xl font-black mb-2 uppercase tracking-wider text-emerald-500">Contato & Suporte</h3>
                  <div className={`p-5 rounded-xl border flex flex-col md:flex-row gap-4 items-center justify-between ${temaClaro ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-900/10 border-emerald-800'}`}>
                    <div>
                      <h4 className={`font-bold flex items-center gap-2 ${temaClaro ? 'text-gray-900' : 'text-white'}`}>
                        <CheckCircle2 size={18} className="text-emerald-500"/> Suporte Especializado 24h
                      </h4>
                      <p className="text-sm mt-1 text-gray-500">Dúvidas sobre o diagnóstico ou precisa de um upgrade? A equipe Bytebros.TI está pronta para ajudar.</p>
                    </div>
                    <div className="text-right flex flex-col gap-2 shrink-0">
                      <a href="https://wa.me/5561999144748" target="_blank" rel="noreferrer" className="flex items-center justify-end gap-2 text-emerald-600 hover:text-emerald-500 font-black transition">
                        <Phone size={16}/> (61) 99914-4748
                      </a>
                      <a href="https://instagram.com/bytebros.ti" target="_blank" rel="noreferrer" className="flex items-center justify-end gap-2 text-pink-600 hover:text-pink-500 font-black transition">
                        <Link size={16}/> @bytebros.ti
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'manual' && (
              <div className="animate-in fade-in duration-300 relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black uppercase tracking-wider text-blue-500">Manual Simplificado</h3>
                  <button onClick={baixarManualPDF} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition shadow-md flex items-center gap-2">
                    <Download size={16} /> Baixar em PDF
                  </button>
                </div>
                
                <div className={`p-8 rounded-xl space-y-6 ${temaClaro ? 'bg-white' : 'bg-[#111111]'}`}>
                  <div className={`text-center mb-8 border-b pb-6 ${temaClaro ? 'border-gray-200' : 'border-gray-800'}`}>
                    <h1 className="text-2xl font-black text-blue-600">GUIA DE USO: BYTEREPORTS</h1>
                    <p className={`text-sm mt-2 ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`}>Aprenda a diagnosticar e compartilhar a saúde do seu computador em poucos cliques.</p>
                  </div>

                  <div className={`p-6 rounded-lg border shadow-sm ${temaClaro ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                    <h4 className="font-bold text-lg mb-2 text-blue-500 flex items-center gap-2">1. O Painel Principal</h4>
                    <p className={`text-sm leading-relaxed mb-2 ${temaClaro ? 'text-gray-700' : 'text-gray-300'}`}>Assim que você abre o aplicativo, ele já está lendo as peças do seu computador automaticamente em tempo real. Não precisa clicar em nada para ele começar a funcionar!</p>
                    <p className={`text-sm leading-relaxed ${temaClaro ? 'text-gray-500' : 'text-gray-500'}`}>💡 <strong>Dica:</strong> Se você não sabe o que uma peça faz, basta colocar o mouse em cima da pergunta <em>"O QUE É ISSO?"</em> no cartão correspondente para ler uma explicação simples.</p>
                  </div>

                  <div className={`p-6 rounded-lg border shadow-sm ${temaClaro ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                    <h4 className="font-bold text-lg mb-2 text-blue-500 flex items-center gap-2">2. Entendendo as Cores (Alertas)</h4>
                    <p className={`text-sm leading-relaxed ${temaClaro ? 'text-gray-700' : 'text-gray-300'}`}>
                      O sistema usa cores para te avisar o status do seu hardware:
                      <br/>- <strong className={paleta.okText}>Verde (Perfeito):</strong> A peça está funcionando com folga, sem problemas.
                      <br/>- <strong className="text-blue-500">Azul (Dica):</strong> Sugestões e dicas para melhorar a vida útil da máquina.
                      <br/>- <strong className={paleta.warnText}>Amarelo/Laranja (Atenção):</strong> A peça está com uso elevado. Não é crítico, mas em tarefas pesadas pode causar lentidão.
                      <br/>- <strong className={paleta.critText}>Vermelho (Crítico):</strong> A peça chegou no limite (acima de 85%). Isso é o que causa superaquecimento e travamentos graves no PC.
                    </p>
                  </div>

                  <div className={`p-6 rounded-lg border shadow-sm ${temaClaro ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                    <h4 className="font-bold text-lg mb-2 text-blue-500 flex items-center gap-2">3. Criando o seu Relatório</h4>
                    <p className={`text-sm leading-relaxed mb-3 ${temaClaro ? 'text-gray-700' : 'text-gray-300'}`}>Para ver o veredito final, clique no botão azul <strong>"Gerar Relatório"</strong>.</p>
                    <ul className={`list-disc pl-5 text-sm space-y-2 ${temaClaro ? 'text-gray-600' : 'text-gray-400'}`}>
                      <li><strong>Modo Simples:</strong> Cria um resumo fácil de entender para leigos.</li>
                      <li><strong>Modo Avançado:</strong> Mostra detalhes técnicos completos para profissionais.</li>
                      <li><strong>Objetivo:</strong> Escolha para que você usa o PC. A inteligência do sistema dirá se suas peças aguentam o tranco.</li>
                    </ul>
                  </div>

                  <div className={`p-6 rounded-lg border shadow-sm ${temaClaro ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                    <h4 className="font-bold text-lg mb-2 text-blue-500 flex items-center gap-2">4. Salvando e Compartilhando</h4>
                    <p className={`text-sm leading-relaxed ${temaClaro ? 'text-gray-700' : 'text-gray-300'}`}>No final do relatório, você tem duas opções de exportação:
                      <br/><br/>- <strong>Baixar PDF:</strong> Cria um documento formal e visual.
                      <br/>- <strong>Copiar e Baixar TXT:</strong> Salva um arquivo de texto e copia tudo para a sua área de transferência. Basta abrir o WhatsApp e usar o comando <kbd className="bg-gray-700 border-gray-600 text-white px-2 py-0.5 rounded font-mono text-xs">Ctrl + V</kbd> para colar o laudo inteiro.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sobre' && (
              <div className="space-y-6 animate-in fade-in duration-300 text-center flex flex-col items-center py-4 h-full overflow-y-auto">
                <img src="/logo.png" alt="ByteReports Logo" className="h-16 mb-2 opacity-90 mx-auto" />
                
                <div className={`p-6 rounded-xl border w-full max-w-lg mx-auto ${temaClaro ? 'bg-blue-50 border-blue-200' : 'bg-blue-900/10 border-blue-900/50'}`}>
                  <p className="text-sm leading-relaxed text-justify mb-4">
                    O <strong>ByteReports</strong> é um software de diagnóstico profissional, com arquitetura idealizada pela ByteBros.TI, voltado para agilizar a avaliação de hardware e automatizar laudos técnicos de forma precisa.
                  </p>
                  <p className="text-sm leading-relaxed text-justify">
                    A ferramenta foi construída para atender às exigências de transparência com nossos clientes, oferecendo auditoria em tempo real, sugestões inteligentes via Inteligência Artificial (IA) e emissão de relatórios corporativos.
                  </p>
                </div>

                {/* NOVA SEÇÃO: IDEALIZADORES E GITHUB */}
                <div className={`p-6 rounded-xl border w-full max-w-lg mx-auto text-left ${temaClaro ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                  <h4 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                    Desenvolvedores & Idealizadores
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">CEO (Fundador)</span>
                      <a href="https://github.com/OGUTAO" target="_blank" rel="noreferrer" className={`text-sm font-bold transition ${temaClaro ? 'text-gray-800 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'}`}>
                        Luiz Felipe S. de Abreu
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">COO (Diretor de Operações)</span>
                      <a href="https://github.com/M1r40107" target="_blank" rel="noreferrer" className={`text-sm font-bold transition ${temaClaro ? 'text-gray-800 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'}`}>
                        Guilherme M. Cavalcante
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">CTO (Diretor de Tecnologia)</span>
                      <a href="https://github.com/josewaldoneto" target="_blank" rel="noreferrer" className={`text-sm font-bold transition ${temaClaro ? 'text-gray-800 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'}`}>
                        José Waldo S. C. Neto
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">CMO (Diretor de Marketing)</span>
                      <a href="https://github.com/BrunoMont18" target="_blank" rel="noreferrer" className={`text-sm font-bold transition ${temaClaro ? 'text-gray-800 hover:text-blue-600' : 'text-gray-200 hover:text-blue-400'}`}>
                        Bruno M. Fonseca
                      </a>
                    </div>
                  </div>

                  <a href="https://github.com/ByteReports" target="_blank" rel="noreferrer" className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border font-bold text-sm transition ${temaClaro ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}>
                    <Link size={18} /> Acessar Repositório no GitHub
                  </a>
                </div>

                <div className={`mt-2 p-4 rounded-lg border w-full max-w-lg text-left flex justify-between items-center mx-auto ${temaClaro ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                  <div>
                    <p className="text-xs font-mono font-bold text-gray-500 mb-1">VERSÃO DO SISTEMA (BUILD CORPORATIVA)</p>
                    <p className="text-sm font-bold">v2.5.0</p>
                  </div>
                  <Globe size={24} className="text-gray-500 opacity-50" />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* CONTAINER INVISÍVEL DO MANUAL */}
        <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none">
          <div ref={pdfManualRef} className="w-[800px] bg-white text-gray-900 p-10 rounded-xl space-y-6 font-sans">
            <div className="text-center mb-8 border-b pb-6 border-gray-200">
              <h1 className="text-2xl font-black text-blue-600">GUIA DE USO: BYTEREPORTS</h1>
            </div>
            <div className="p-6 rounded-lg border bg-gray-50 border-gray-200 shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-600 flex items-center gap-2">Entendendo as Cores</h4>
              <p className="text-sm leading-relaxed text-gray-700">
                - <strong className="text-emerald-500">Verde (Perfeito):</strong> Peça funcionando com folga.<br/>
                - <strong className="text-amber-500">Amarelo (Atenção):</strong> Uso elevado.<br/>
                - <strong className="text-red-500">Vermelho (Crítico):</strong> Limite atingido (risco de travamentos).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatorioModal({ isOpen, onClose, data, temaClaro, modoDaltonismo }) {
  const [tipo, setTipo] = useState('avancado'); 
  const [perfil, setPerfil] = useState('Trabalho Leve (Navegação, Pacote Office)');
  const reportRef = useRef();

  if (!isOpen || !data) return null;

  const paleta = getPalette(modoDaltonismo);
  const perfisDisponiveis = data.diagnostico_e_sugestoes ? Object.keys(data.diagnostico_e_sugestoes) : [];
  const dicas = data.diagnostico_e_sugestoes?.[perfil] || ["Análise indisponível."];

  const gerarParecerTecnico = (dataInfo, perfilAtivo, tipoExibicao) => {
    const ram = dataInfo?.ram?.total_gb || 0;
    const temDedicada = dataInfo?.video?.placas?.some(g => g.tipo === 'Dedicada');
    let parecer = "";

    if (tipoExibicao === 'simples') {
        if (perfilAtivo.includes("Leve")) {
            if (ram < 6) parecer = "O seu computador está com a memória RAM no limite. Isso faz com que a máquina trave até mesmo ao abrir muitas abas na internet. Sugerimos fortemente adicionar mais memória (chegar a 8GB ou 16GB) para trabalhar sem interrupções.";
            else parecer = "Boas notícias! O seu computador atende perfeitamente ao seu objetivo. Ele tem memória e potência suficientes para navegar na internet, assistir vídeos e usar o Pacote Office de forma fluida. Nenhuma melhoria de peças é necessária para este uso.";
        } else if (perfilAtivo.includes("Médio")) {
            if (ram < 13) parecer = "Para trabalhar com vários sistemas abertos ao mesmo tempo, seu computador precisa de mais fôlego. Recomendamos um upgrade para 16GB de memória RAM. Isso vai acabar com a lentidão no seu dia a dia de trabalho.";
            else parecer = "Máquina perfeita para o seu trabalho! Você tem memória RAM de sobra para usar vários sistemas simultaneamente sem passar raiva com travamentos. Não é necessário investir em peças novas agora.";
        } else if (perfilAtivo.includes("Pesado") || perfilAtivo.includes("Edição")) {
            if (ram < 29 || !temDedicada) parecer = "Atenção: O seu computador vai engasgar bastante com trabalhos pesados de edição ou programação. Ele precisa urgentemente de mais memória RAM (o ideal é 32GB) e de uma Placa de Vídeo Dedicada para dar conta do recado e renderizar as imagens sem travar.";
            else parecer = "Excelente máquina! O seu computador é um trator para trabalho pesado e atende a todos os requisitos com folga. Nenhuma peça precisa ser trocada ou melhorada no momento.";
        } else if (perfilAtivo.includes("Jogos") || perfilAtivo.includes("Gravação")) {
            if (!temDedicada) parecer = "Infelizmente, o seu computador não tem uma Placa de Vídeo Dedicada. Sem ela, jogos modernos e gravações vão ficar travando ou com a imagem muito ruim. É fundamental a instalação de uma placa de vídeo para você conseguir jogar sem dores de cabeça.";
            else if (ram < 13) parecer = "Você já tem uma placa de vídeo, mas está faltando memória RAM. Adicionar mais memória (chegar a 16GB ou 32GB) vai remover os pequenos engasgos durante as suas partidas e gravações.";
            else parecer = "Setup Gamer e de Gravação aprovado! O computador está pronto para rodar jogos e vídeos com ótima qualidade. Pode se divertir e gravar sem preocupações, nenhuma melhoria de peça é necessária no momento.";
        }
    } else {
        if (perfilAtivo.includes("Leve")) {
            if (ram < 6) parecer = `Gargalo de Hardware Crítico (RAM). A capacidade primária atual (${ram}GB) acarreta em alto índice de "Page Faults" e uso excessivo do arquivo de paginação (Swap) no disco. Recomendamos upgrade imediato para 8GB ou 16GB em Dual-Channel para estabilizar o S.O.`;
            else parecer = `Hardware operando com folga operacional expressiva. O dimensionamento atual de ${ram}GB de RAM mitiga o uso do arquivo de paginação e mantém o throughput do processador estável. A arquitetura atual é perfeitamente satisfatória, sem necessidade de intervenção de upgrade.`;
        } else if (perfilAtivo.includes("Médio")) {
            if (ram < 13) parecer = `A volumetria de memória RAM atual é insuficiente para multithreading e alocação assíncrona exigida por aplicações web corporativas modernas. É imperativo o upgrade para 16GB visando eliminar o overhead no disco (Swap) durante picos de uso intensos.`;
            else parecer = `Arquitetura de sistema perfeitamente dimensionada. Os ${ram}GB de RAM presentes garantem alocação elástica rápida para multitarefas pesadas, sem gerar overhead no barramento da placa-mãe. Hardware aprovado, sem necessidade de novos upgrades sistêmicos.`;
        } else if (perfilAtivo.includes("Pesado") || perfilAtivo.includes("Edição")) {
            if (ram < 29 || !temDedicada) parecer = `Topologia de hardware incompatível com a carga de trabalho proposta. A ausência de 32GB de RAM causa "thrashing" severo ao compilar código ou renderizar vídeos em alta resolução. A falta de VRAM dedicada impõe todo o overhead computacional gráfico na CPU. Upgrades de RAM e GPU são mandatórios para viabilizar as atividades.`;
            else parecer = `Workstation de alta performance validada e aprovada. Hardware dimensionado corretamente para lidar com compilações multithread agressivas e renderização acelerada via GPU. Fluxo de dados otimizado entre CPU, RAM e Vídeo, sem gargalos sistêmicos mapeados no momento.`;
        } else if (perfilAtivo.includes("Jogos") || perfilAtivo.includes("Gravação")) {
            if (!temDedicada) parecer = `Gargalo Crítico de Processamento Gráfico detectado. A ausência de processadores de fluxo dedicados e VRAM isolada impossibilita a renderização de quadros em tempo real para títulos modernos. Upgrade mandatório de Placa de Vídeo Dedicada (GPU) para viabilizar o encoding e as rotinas 3D.`;
            else if (ram < 13) parecer = `Gargalo de Memória Primária ativo. Embora o processamento gráfico esteja isolado na GPU, a limitação estrita da RAM (${ram}GB) causará "stuttering" crônico (travamentos bruscos) por falhas de cache L3 e swaps de assets pesados na memória durante as partidas. Upgrade para 16GB ou 32GB altamente recomendado para estabilidade de frametime (1% low).`;
            else parecer = `Setup de processamento misto otimizado e completamente balanceado. O pipeline gráfico atual atua de forma assíncrona perfeitamente com a unidade central de processamento. As latências de barramento de memória encontram-se dentro dos padrões exigidos para framerates elevados e "hardware encoding" de streaming em tempo real. Setup 100% validado para o cenário de carga.`;
        }
    }
    return parecer || "Análise preliminar estrutural: O equipamento atende as rotinas base, contudo melhorias pontuais podem escalar a performance geral.";
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pageHeight = 297;
    const marginX = 10;
    const availableWidth = pdfWidth - (marginX * 2);
    
    let currentY = 10; 
    let pageNum = 1;

    // A classe .print-section agora envolve os blocos lógicos do relatório para não cortá-los
    const sections = reportRef.current.querySelectorAll('.print-section');
    if (sections.length === 0) return;

    const desenharRodape = () => {
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, pageHeight - 12, pdfWidth, 12, 'F');
      pdf.setFont("courier", "normal");
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(8);
      pdf.text(`Página ${pageNum}`, pdfWidth / 2, pageHeight - 5, { align: 'center' });
    };

    // Tira foto APENAS do cabeçalho HTML para replicar nas outras páginas idêntico ao original
    const headerCanvas = await html2canvas(sections[0], { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const headerImg = headerCanvas.toDataURL('image/png');
    const headerHeight = (headerCanvas.height * availableWidth) / headerCanvas.width;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      
      // A primeira seção é o cabeçalho, apenas injetamos a foto dele no topo
      if (i === 0) {
          pdf.addImage(headerImg, 'PNG', marginX, currentY, availableWidth, headerHeight);
          currentY += headerHeight + 5;
          continue;
      }

      // Tira foto de cada bloco (Visão Geral, Análise, Parecer, Footer) individualmente
      const canvas = await html2canvas(section, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * availableWidth) / canvas.width;

      // Se o bloco não couber na página, cria uma nova e "carimba" o cabeçalho novamente
      if (currentY + imgHeight > pageHeight - 15) {
        desenharRodape();
        pdf.addPage();
        pageNum++;
        currentY = 10;
        
        pdf.addImage(headerImg, 'PNG', marginX, currentY, availableWidth, headerHeight);
        currentY += headerHeight + 5;
      }

      pdf.addImage(imgData, 'PNG', marginX, currentY, availableWidth, imgHeight);
      currentY += imgHeight + 5;
    }
    
    desenharRodape();
    pdf.save(`ByteReports_${tipo}_${data.placa_mae?.modelo || 'PC'}.pdf`);
  };

  const exportarTXT = () => {
    let txt = `=========================================\n`;
    txt += `      BYTEREPORTS - RELATÓRIO TÉCNICO    \n`;
    txt += `=========================================\n`;
    txt += `Data: ${new Date().toLocaleDateString()} | Horário: ${new Date().toLocaleTimeString()}\n`;
    txt += `Perfil de Análise: ${perfil}\n\n`;

    txt += `[ ESPECIFICAÇÕES DO HARDWARE ]\n`;
    txt += `- Processador: ${data.cpu?.nome} (Uso Atual: ${data.cpu?.uso_medio_porcento}%)\n`;
    txt += `- Memória RAM: ${data.ram?.total_gb} GB (Uso Atual: ${data.ram?.uso_medio_porcento}%)\n`;
    txt += `- Placa Mãe: ${data.placa_mae?.modelo} (${data.placa_mae?.fabricante})\n`;
    txt += `- Sistema Operacional: ${data.sistema?.so} (${data.sistema?.arquitetura})\n`;
    txt += `- Tráfego de Rede (Teste): Download ${data.rede?.download_mbps} Mbps | Upload ${data.rede?.upload_mbps} Mbps\n\n`;

    txt += `[ ARMAZENAMENTO ]\n`;
    data.armazenamento?.particoes?.forEach(p => {
      txt += `- Disco ${p.letra}: ${p.livre_gb}GB Livres (${p.uso_porcento}% de Uso)\n`;
    });
    txt += `\n`;

    if (data.video?.placas && data.video.placas.length > 0) {
      txt += `[ PLACAS DE VÍDEO ]\n`;
      data.video.placas.forEach((gpu, i) => {
         txt += `- GPU ${i+1}: ${gpu.nome} (${gpu.tipo})\n`;
      });
      txt += `\n`;
    }

    txt += `[ ANÁLISE TÉCNICA E SUGESTÕES ]\n`;
    dicas.forEach(dica => {
       txt += `* ${dica}\n`;
    });
    txt += `\n`;

    txt += `[ PARECER TÉCNICO ]\n`;
    txt += `${gerarParecerTecnico(data, perfil, tipo)}\n\n`;

    txt += `=========================================\n`;
    txt += `[ PROJETOS DE MELHORIA PARA SUA MÁQUINA ]\n`;
    txt += `A Bytebros.TI coloca-se à disposição para realizar a manutenção corretiva, limpeza interna profunda e todos os upgrades de hardware recomendados neste parecer (ou outros que você deseje).\n\n`;
    txt += `Fale com nossa equipe especializada:\n`;
    txt += `WhatsApp: (61) 99914-4748\n`;
    txt += `Instagram: @bytebros.ti\n`;
    txt += `=========================================\n`;

    navigator.clipboard.writeText(txt).catch(err => console.error("Erro ao copiar:", err));
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ByteReports_${data.placa_mae?.modelo || 'PC'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    alert("✅ Sucesso! O arquivo .TXT foi baixado e o texto copiado para o seu teclado.");
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-5xl max-h-[90vh] rounded-xl p-6 border flex flex-col shadow-2xl ${temaClaro ? 'bg-gray-100 border-gray-300' : 'bg-[#111111] border-gray-700'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-black ${temaClaro ? 'text-gray-900' : 'text-white'}`}>Exportação de Diagnóstico</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 font-bold transition">FECHAR [X]</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`flex rounded-lg p-1 ${temaClaro ? 'bg-gray-300' : 'bg-gray-800'}`}>
            <button onClick={() => setTipo('simples')} className={`flex-1 py-2 rounded font-bold text-sm transition ${tipo === 'simples' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-500'}`}>Leigos (Simples)</button>
            <button onClick={() => setTipo('avancado')} className={`flex-1 py-2 rounded font-bold text-sm transition ${tipo === 'avancado' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-500'}`}>Técnicos (Avançado)</button>
          </div>
          <select className={`w-full p-3 rounded-lg text-sm font-bold border outline-none ${temaClaro ? 'bg-white text-gray-800 border-gray-300' : 'bg-gray-800 text-white border-transparent'}`} value={perfil} onChange={(e) => setPerfil(e.target.value)}>
            {perfisDisponiveis.map(p => <option key={p} value={p}>Objetivo: {p}</option>)}
          </select>
        </div>

        <div className="overflow-y-auto pr-2 pb-4">
          {/* Adicionamos a classe flex flex-col gap-6 para estruturar perfeitamente as print-sections */}
          <div ref={reportRef} className="bg-white text-black p-8 rounded-lg flex flex-col gap-6">
            
            {/* BLOCO 0: O CABEÇALHO */}
            <div className="print-section border-b-2 border-gray-200 pb-4 flex justify-between items-end bg-white">
              <div>
                <h1 className="text-3xl font-black text-blue-600 tracking-tighter">BYTEREPORTS</h1>
                <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Relatório Técnico Profissional</p>
              </div>
              <div className="text-right text-xs font-mono text-gray-500">
                Data: {new Date().toLocaleDateString()}<br/>
                Horário: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {tipo === 'simples' ? (
              <>
                {/* BLOCO 1: VISÃO GERAL SIMPLES */}
                <div className="print-section bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <h3 className="text-2xl font-black text-blue-600 mb-6 text-center">Como está o seu computador?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-blue-600"><Cpu size={20}/><h4 className="font-bold text-sm uppercase leading-none">Processador (Cérebro)</h4></div>
                      <p className="font-black text-gray-800">{data.cpu?.nome}</p>
                      <p className="text-xs text-gray-500 mt-2">Ele pensa e executa todos os cliques que você faz no dia a dia.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-purple-600"><MemoryStick size={20}/><h4 className="font-bold text-sm uppercase leading-none">Memória RAM (Mesa)</h4></div>
                      <p className="font-black text-gray-800">{data.ram?.total_gb} GB Instalados</p>
                      <p className="text-xs text-gray-500 mt-2">É a sua mesa de trabalho. Se ficar sem espaço, o computador trava ao abrir muitas coisas.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-emerald-600"><HardDrive size={20}/><h4 className="font-bold text-sm uppercase leading-none">Armazenamento (Armário)</h4></div>
                      <p className="font-black text-gray-800">{data.armazenamento?.particoes?.[0]?.livre_gb} GB Livres (Disco {data.armazenamento?.particoes?.[0]?.letra})</p>
                      <p className="text-xs text-gray-500 mt-2">Local onde todos os seus arquivos, fotos e o Windows ficam guardados para sempre.</p>
                    </div>

                    {data.video?.placas?.map((gpu, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className={`flex items-center gap-2 mb-2 ${gpu.tipo === 'Integrada' ? 'text-cyan-600' : 'text-pink-600'}`}>
                          <MonitorPlay size={20}/><h4 className="font-bold text-sm uppercase leading-none">{gpu.tipo === 'Integrada' ? 'Chipset Gráfico' : 'Placa de Vídeo Dedicada'}</h4>
                        </div>
                        <p className="font-black text-gray-800">{gpu.nome}</p>
                        <p className="text-xs text-gray-500 mt-2">A "Fábrica de imagens" responsável por exibir tudo na sua tela.</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BLOCO 2: DICAS TÉCNICAS SIMPLES */}
                <div className="print-section border-t-2 border-gray-900 pt-6 bg-white">
                  <h3 className="text-lg font-black mb-4 uppercase">Análise Técnica ({perfil}):</h3>
                  <div className="grid gap-4">
                    {dicas.map((dica, i) => {
                      let bgColor = 'bg-gray-50 border-gray-200 text-gray-800';
                      let IconComponent = Info; let iconColor = 'text-blue-500';
                      
                      if (dica.includes("CRÍTICO")) { bgColor = `${paleta.critLightBg} ${paleta.critBorder} text-gray-900`; IconComponent = AlertTriangle; iconColor = paleta.critText; }
                      else if (dica.includes("AVISO")) { bgColor = `${paleta.warnLightBg} ${paleta.warnBorder} text-gray-900`; IconComponent = AlertTriangle; iconColor = paleta.warnText; }
                      else if (dica.includes("SUGESTÃO")) { bgColor = 'bg-blue-50 border-blue-200 text-blue-900'; IconComponent = Info; iconColor = 'text-blue-500'; }
                      else if (dica.includes("PERFEITO")) { bgColor = `${paleta.okLightBg} ${paleta.okBorder} text-gray-900`; IconComponent = CheckCircle2; iconColor = paleta.okText; }
                      
                      const textoLimpo = dica.replace("⚠️ CRÍTICO: ", "").replace("⚠️ AVISO: ", "").replace("💡 SUGESTÃO: ", "").replace("✅ PERFEITO: ", "");
                      return (
                        <div key={i} className={`p-4 rounded-lg border flex gap-4 items-center shadow-sm ${bgColor}`}>
                          <div className={iconColor}><IconComponent size={20}/></div>
                          <p className="text-sm font-medium leading-relaxed">{textoLimpo}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* BLOCO 3: PARECER SIMPLES */}
                <div className="print-section bg-blue-600 text-white p-6 rounded-xl border border-blue-700 shadow-md">
                  <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                    <PenTool size={20} /> Parecer Final do Técnico
                  </h3>
                  <p className="text-sm font-medium leading-relaxed">
                    {gerarParecerTecnico(data, perfil, tipo)}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* BLOCO 1: HARDWARE GRID AVANÇADO */}
                <div className="print-section flex flex-col gap-4 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-blue-600"><Cpu size={18}/><h3 className="font-bold text-sm uppercase leading-none">Processador</h3></div>
                      <p className="font-bold text-base mb-3 break-words">{data.cpu?.nome}</p>
                      <div className="bg-gray-50 px-2 py-1.5 rounded border border-gray-100 text-xs font-mono text-gray-500 flex items-center w-fit leading-none">Uso Atual: {data.cpu?.uso_medio_porcento}%</div>
                    </div>

                    <div className="border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-purple-600"><MemoryStick size={18}/><h3 className="font-bold text-sm uppercase leading-none">Memória RAM</h3></div>
                      <p className="font-bold text-xl mb-3">{data.ram?.total_gb} GB</p>
                      <div className="bg-gray-50 px-2 py-1.5 rounded border border-gray-100 text-xs font-mono text-gray-500 flex items-center w-fit leading-none">Uso Atual: {data.ram?.uso_medio_porcento}%</div>
                    </div>
                  </div>

                  {data.video?.placas?.map((gpu, i) => (
                    <div key={i} className={`border p-4 rounded-lg ${gpu.tipo === 'Integrada' ? 'border-cyan-200 bg-cyan-50/30' : 'border-pink-200 bg-pink-50/30'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`flex items-center gap-2 ${gpu.tipo === 'Integrada' ? 'text-cyan-600' : 'text-pink-600'}`}>
                          <MonitorPlay size={18}/><h3 className="font-bold text-sm uppercase leading-none">GPU {i+1}: {gpu.nome}</h3>
                        </div>
                        {/* AQUI ESTÁ A CORREÇÃO PRINCIPAL DO INTEGRADA/DEDICADA */}
                        <div className={`flex items-center justify-center text-[10px] font-black px-2 py-1.5 rounded text-white leading-none ${gpu.tipo === 'Integrada' ? 'bg-cyan-500' : 'bg-pink-500'}`}>
                          {gpu.tipo.toUpperCase()}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-600">
                        <div className="bg-white px-3 py-2 rounded border border-gray-200 flex items-center leading-none"><strong>VRAM:</strong> <span className="ml-1">{gpu.vram_gb}</span></div>
                        <div className="bg-white px-3 py-2 rounded border border-gray-200 flex items-center break-all leading-none"><strong>Driver:</strong> <span className="ml-1">{gpu.driver_versao}</span></div>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-4">
                     <div className="border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-orange-500"><Activity size={18}/><h3 className="font-bold text-sm uppercase leading-none">Placa Mãe</h3></div>
                        <p className="font-bold text-sm mb-3">{data.placa_mae?.modelo}</p>
                        <div className="text-[10px] text-gray-500 font-mono px-2 py-1.5 bg-gray-50 border border-gray-100 rounded flex items-center w-fit uppercase leading-none">{data.placa_mae?.fabricante}</div>
                     </div>
                     
                     <div className="border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-emerald-500"><HardDrive size={18}/><h3 className="font-bold text-sm uppercase leading-none">Armazenamento</h3></div>
                        <div className="grid grid-cols-1 gap-2 mt-3">
                          {data.armazenamento?.particoes?.map((p, i) => (
                            <div key={i} className="text-[10px] font-mono bg-gray-50 border border-gray-200 px-3 py-2 rounded flex items-center leading-none">
                              <span className="font-bold text-emerald-600 mr-1">DISCO {p.letra}: </span>
                              <span className="text-gray-600">{p.livre_gb}GB Livres ({p.uso_porcento}% Uso)</span>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-3 text-indigo-500"><Monitor size={18}/><h3 className="font-bold text-sm uppercase leading-none">Sistema Operacional</h3></div>
                        <div className="text-sm font-mono space-y-2">
                           <div className="bg-white px-3 py-2 border border-gray-200 rounded flex items-center leading-none">OS: <strong className="font-sans ml-1">{data.sistema?.so}</strong></div>
                           <div className="bg-white px-3 py-2 border border-gray-200 rounded flex items-center leading-none">Uptime: <strong className="font-sans ml-1">{data.sistema?.tempo_ligado}</strong></div>
                        </div>
                     </div>
                     <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-3 text-yellow-500"><Globe size={18}/><h3 className="font-bold text-sm uppercase leading-none">Velocidade de Rede</h3></div>
                        <div className="text-sm font-mono space-y-2">
                           <div className="bg-white px-3 py-2 border border-gray-200 rounded flex items-center leading-none">Baixando: <strong className="font-sans ml-1">{data.rede?.download_mbps} Mbps</strong></div>
                           <div className="bg-white px-3 py-2 border border-gray-200 rounded flex items-center leading-none">Enviando: <strong className="font-sans ml-1">{data.rede?.upload_mbps} Mbps</strong></div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* BLOCO 2: DICAS TÉCNICAS AVANÇADO */}
                <div className="print-section border-t-2 border-gray-900 pt-6 bg-white">
                  <h3 className="text-lg font-black mb-4 uppercase">Análise Técnica ({perfil}):</h3>
                  <div className="grid gap-4">
                    {dicas.map((dica, i) => {
                      let bgColor = 'bg-gray-50 border-gray-200 text-gray-800';
                      let IconComponent = Info; let iconColor = 'text-blue-500';
                      
                      if (dica.includes("CRÍTICO")) { bgColor = `${paleta.critLightBg} ${paleta.critBorder} text-gray-900`; IconComponent = AlertTriangle; iconColor = paleta.critText; }
                      else if (dica.includes("AVISO")) { bgColor = `${paleta.warnLightBg} ${paleta.warnBorder} text-gray-900`; IconComponent = AlertTriangle; iconColor = paleta.warnText; }
                      else if (dica.includes("SUGESTÃO")) { bgColor = 'bg-blue-50 border-blue-200 text-blue-900'; IconComponent = Info; iconColor = 'text-blue-500'; }
                      else if (dica.includes("PERFEITO")) { bgColor = `${paleta.okLightBg} ${paleta.okBorder} text-gray-900`; IconComponent = CheckCircle2; iconColor = paleta.okText; }
                      
                      const textoLimpo = dica.replace("⚠️ CRÍTICO: ", "").replace("⚠️ AVISO: ", "").replace("💡 SUGESTÃO: ", "").replace("✅ PERFEITO: ", "");
                      return (
                        <div key={i} className={`p-4 rounded-lg border flex gap-4 items-center shadow-sm ${bgColor}`}>
                          <div className={iconColor}><IconComponent size={20}/></div>
                          <p className="text-sm font-medium leading-relaxed">{textoLimpo}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* BLOCO 3: PARECER AVANÇADO */}
                <div className="print-section bg-gray-900 text-white p-6 rounded-xl border border-gray-800 shadow-md">
                  <h3 className="text-xl font-black mb-2 flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                    <PenTool size={20} /> Parecer Técnico Especializado
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-300">
                    {gerarParecerTecnico(data, perfil, tipo)}
                  </p>
                </div>
              </>
            )}

            {/* BLOCO 4: FOOTER E PROPAGANDA */}
            <div className="print-section bg-gray-50 border-2 border-gray-200 p-6 rounded-xl mt-4">
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-wide">Projetos de Melhoria para Sua Máquina</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                A equipe da <strong className="text-blue-600">Bytebros.TI</strong> coloca-se à inteira disposição para realizar a manutenção corretiva, limpeza interna profunda e todos os upgrades de hardware recomendados neste parecer (ou outros que você deseje).
              </p>
              
              <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-200">
                <img src="/qrcode.png" alt="QR Code Bytebros" className="w-20 h-20 rounded-lg object-cover border border-gray-100" onError={(e) => e.target.style.display = 'none'} />
                
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b pb-1">Fale com nossa equipe especializada</p>
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-base leading-none">
                    <Phone size={16}/> (61) 99914-4748
                  </div>
                  <div className="flex items-center gap-2 text-pink-600 font-black text-base leading-none">
                    <Link size={16}/> @bytebros.ti
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button onClick={downloadPDF} className={`flex-1 ${paleta.okBg} hover:opacity-90 py-4 rounded-lg font-black tracking-widest transition text-white shadow-lg flex items-center justify-center gap-2`}>
            <FileText size={20} /> BAIXAR PDF (FORMAL)
          </button>
          <button onClick={exportarTXT} className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-lg font-black tracking-widest transition text-white shadow-lg flex items-center justify-center gap-2">
            <Copy size={20} /> COPIAR E BAIXAR .TXT (WHATSAPP)
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [telaAtual, setTelaAtual] = useState('welcome');
  const [relatorio, setRelatorio] = useState(null);
  const [aCarregar, setACarregar] = useState(true);
  const [isRelatorioOpen, setIsRelatorioOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  
  const [temaClaro, setTemaClaro] = useState(false);
  const [modoDaltonismo, setModoDaltonismo] = useState('nenhum'); 

  const paleta = getPalette(modoDaltonismo);

  const fetchDados = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/hardware');
      if (res.ok) setRelatorio(await res.json());
    } catch (err) { console.error(err); } finally { setACarregar(false); }
  }, []);

  useEffect(() => {
    const iniciarLeitura = () => {
      fetchDados();
    };

    iniciarLeitura(); 
    const interval = setInterval(iniciarLeitura, 1000); 

    return () => clearInterval(interval);
  }, [fetchDados]);

  if (aCarregar && !relatorio) return (
    <div className={`min-h-screen flex items-center justify-center text-blue-500 ${temaClaro ? 'bg-gray-50' : 'bg-[#0a0a0a]'}`}>
      <Loader2 className="animate-spin" size={48} />
    </div>
  );

  if (telaAtual === 'welcome') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-2xl text-center z-10 flex flex-col items-center">
          <div className="mb-8 flex items-center justify-center">
            <img src="/logo.png" alt="ByteReports Logo" className="h-16 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Diagnóstico preciso de hardware <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              na velocidade do seu negócio.
            </span>
          </h1>
          <p className="text-base text-gray-400 max-w-lg mb-10 leading-relaxed">
            Monitore o desempenho do seu sistema em tempo real, identifique gargalos críticos e gere relatórios técnicos automatizados com um único clique.
          </p>
          <button onClick={() => setTelaAtual('dashboard')} className="group bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest text-sm py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] flex items-center gap-3 uppercase">
            Começar
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="absolute bottom-12 text-center text-xs font-bold text-gray-500">
          Suporte Técnico: <span className="text-emerald-500">(61) 99914-4748</span>
        </div>
        
        <footer className="absolute bottom-6 text-[10px] font-mono text-gray-600 tracking-wider">
          POWERED BY BYTEBROS.TI
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-300 ${temaClaro ? 'bg-gray-50 text-gray-900' : 'bg-[#0a0a0a] text-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        <header className={`mb-10 border-b pb-8 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-start md:items-center ${temaClaro ? 'border-gray-300' : 'border-gray-800'}`}>
          <div className="flex flex-col gap-1">
            <img src="/logo.png" alt="Logo" className="h-10 object-contain object-left" />
            <span className={`text-[10px] font-bold tracking-widest uppercase ${temaClaro ? 'text-gray-500' : 'text-gray-500'}`}>
              Relatório de Análise Técnica de Hardware
            </span>
            <button onClick={() => setTelaAtual('welcome')} className={`mt-4 flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider font-mono transition border w-fit ${temaClaro ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' : 'bg-blue-900/20 border-blue-500/30 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300'}`}>
              <ArrowRight size={12} className="rotate-180" /> Início
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={() => setIsUpgradeModalOpen(true)} className={`p-2 px-4 rounded-lg font-black transition shadow-sm flex items-center gap-2 ${temaClaro ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50'}`}>
              <Wrench size={18} /> Faça seu Upgrade
            </button>

            <button onClick={() => setIsConfigOpen(true)} className={`p-2 px-4 rounded-lg font-bold transition shadow-sm flex items-center gap-2 border ${temaClaro ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-[#111111] text-gray-300 border-gray-700 hover:bg-gray-800'}`}>
              <Settings size={18} className="text-blue-500" /> Configurações
            </button>
            <button onClick={() => setIsRelatorioOpen(true)} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition text-sm text-white shadow-lg flex items-center gap-2">
              <FileText size={18}/> Gerar Relatório
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HardwareCard title="Processador" icon={<Cpu className="text-blue-500" />} temaClaro={temaClaro}>
             <InfoTooltip temaClaro={temaClaro} texto='O "cérebro" da máquina. Ele lê, pensa e executa todas as tarefas e cliques que você faz. Quanto menos porcentagem ele usar no dia a dia, mais "fôlego" o PC tem para tarefas pesadas sem travar.' />
             <div className="text-4xl font-black">{relatorio?.cpu?.uso_medio_porcento}%</div>
             <p className={`text-[9px] mt-4 uppercase font-bold leading-tight ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`} style={{ minHeight: '24px' }}>
               {relatorio?.cpu?.nome}
             </p>
          </HardwareCard>

          <HardwareCard title="Memória RAM" icon={<MemoryStick className="text-purple-500" />} temaClaro={temaClaro}>
            <InfoTooltip temaClaro={temaClaro} texto='A sua "mesa de trabalho". Guarda apenas os programas e abas que estão abertos agora. Se ela chegar perto dos 100%, o PC começa a travar pois não tem mais espaço na mesa para abrir coisas novas.' />
            <div className="text-4xl font-black mb-4">{relatorio?.ram?.uso_medio_porcento}%</div>
            <p className={`text-[9px] uppercase font-bold ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`}>{relatorio?.ram?.total_gb} GB TOTAL</p>
          </HardwareCard>

          <div className="lg:col-span-2">
            <HardwareCard title="Armazenamento" icon={<HardDrive className={paleta.okText} />} temaClaro={temaClaro}>
              <InfoTooltip temaClaro={temaClaro} texto='O "armário" do PC. É aqui que o Windows, suas fotos e documentos ficam salvos para sempre. Se ele ficar sem espaço livre (abaixo de 10GB), o sistema não conseguirá mais baixar atualizações.' />
              {relatorio?.armazenamento?.particoes?.map((p, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-[10px] uppercase font-mono mb-1">
                    <span className="font-bold">DISCO {p.letra}</span>
                    <span>{p.livre_gb}GB LIVRES</span>
                  </div>
                  <div className={`w-full h-2 rounded overflow-hidden ${temaClaro ? 'bg-gray-200' : 'bg-gray-800'}`}>
                    <div className={`h-full transition-all duration-1000 ${p.uso_porcento > 85 ? paleta.critBg : paleta.okBg}`} style={{width: `${p.uso_porcento}%`}}></div>
                  </div>
                </div>
              ))}
            </HardwareCard>
          </div>

          {relatorio?.video?.placas?.map((gpu, i) => {
            const isIntegrada = gpu.tipo === 'Integrada';
            const tooltipTexto = isIntegrada 
              ? 'Fica embutida no Processador e usa a Memória RAM do PC. Ideal para o uso diário, mas limitada para jogos pesados.'
              : 'Uma Placa Dedicada possui seu próprio cérebro e memória (VRAM). É obrigatória para jogos pesados ou softwares de edição.';
              
            return (
            <HardwareCard key={i} title={isIntegrada ? 'Gráficos Integrados' : 'GPU Dedicada'} icon={<MonitorPlay className={isIntegrada ? "text-cyan-500" : "text-pink-500"} />} temaClaro={temaClaro}>
              <InfoTooltip temaClaro={temaClaro} texto={tooltipTexto} />
              
              <div className="flex items-end gap-3 mb-1 h-10">
                {isIntegrada ? (
                  <div className={`text-sm font-black uppercase tracking-widest ${temaClaro ? 'text-cyan-600' : 'text-cyan-500'}`}>
                    Chipset Gráfico
                  </div>
                ) : (
                  <>
                    <div className="text-4xl font-black leading-none">{gpu.uso ?? 0}%</div>
                  </>
                )}
              </div>
              
              <p className={`text-[9px] mt-2 uppercase font-bold leading-tight ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`} style={{ minHeight: '24px' }}>
                {gpu.nome}
              </p>
              
              <div className={`mt-2 flex justify-between text-[9px] uppercase font-mono border-t pt-2 ${temaClaro ? 'border-gray-200 text-gray-500' : 'border-gray-800 text-gray-400'}`}>
                <span>VRAM: {gpu.vram_gb}</span>
                <span className="truncate max-w-[90px]" title={gpu.driver_versao}>DRV: {gpu.driver_versao}</span>
              </div>
            </HardwareCard>
          )})}

          <HardwareCard title="Placa Mãe" icon={<Activity className="text-orange-500" />} temaClaro={temaClaro}>
            <InfoTooltip temaClaro={temaClaro} texto='O "esqueleto" do computador. Uma placa de circuitos gigantesca que conecta todas as outras peças (Processador, RAM, etc) para que elas conversem entre si na velocidade da luz.' />
            <p className="text-sm font-bold text-orange-400">{relatorio?.placa_mae?.modelo}</p>
            <p className={`text-[10px] uppercase mt-1 ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`}>{relatorio?.placa_mae?.fabricante}</p>
          </HardwareCard>

          <HardwareCard title="Sistema Operacional" icon={<Monitor className="text-indigo-500" />} temaClaro={temaClaro}>
            <InfoTooltip temaClaro={temaClaro} texto='O "gerente" do PC (ex: Windows). Ele controla as peças e permite que você instale aplicativos. O Tempo Ligado mostra os dias desde a última vez que ele foi reiniciado de verdade.' />
            <p className="text-sm font-bold text-indigo-400 mt-2">{relatorio?.sistema?.so}</p>
            <div className={`mt-4 flex justify-between text-[10px] uppercase font-mono border-t pt-3 ${temaClaro ? 'border-gray-200 text-gray-500' : 'border-gray-800 text-gray-400'}`}>
              <span>Arquit.: {relatorio?.sistema?.arquitetura}</span>
              <span>Tempo Ligado: {relatorio?.sistema?.tempo_ligado}</span>
            </div>
          </HardwareCard>

          <HardwareCard title="Tráfego de Rede" icon={<Globe className="text-yellow-500" />} temaClaro={temaClaro}>
            <InfoTooltip temaClaro={temaClaro} texto='Mostra a velocidade atual da sua internet em tempo real (Megabits por segundo), igual ao Gerenciador de Tarefas do Windows.' />
            <div className="flex justify-between mt-4">
              <div className="flex flex-col">
                <span className={`text-[10px] uppercase ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`}>Download</span>
                <span className="text-2xl font-black text-yellow-500">
                  {relatorio?.rede?.download_mbps >= 1 ? `${relatorio?.rede?.download_mbps} ` : `${(relatorio?.rede?.download_mbps * 1000).toFixed(0)} `}
                  <span className="text-[10px]">{relatorio?.rede?.download_mbps >= 1 ? 'Mbps' : 'Kbps'}</span>
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className={`text-[10px] uppercase ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`}>Upload</span>
                <span className="text-2xl font-black text-yellow-600">
                  {relatorio?.rede?.upload_mbps >= 1 ? `${relatorio?.rede?.upload_mbps} ` : `${(relatorio?.rede?.upload_mbps * 1000).toFixed(0)} `}
                  <span className="text-[10px]">{relatorio?.rede?.upload_mbps >= 1 ? 'Mbps' : 'Kbps'}</span>
                </span>
              </div>
            </div>
            <div className={`mt-4 flex justify-between text-[9px] uppercase font-mono border-t pt-2 ${temaClaro ? 'border-gray-200 text-gray-500' : 'border-gray-800 text-gray-400'}`}>
              <span>Total Baixado: {relatorio?.rede?.recebido_gb} GB</span>
              <span>Total Enviado: {relatorio?.rede?.enviado_gb} GB</span>
            </div>
          </HardwareCard>

          {relatorio?.bateria?.tem_bateria && (
            <HardwareCard title="Bateria (Portátil)" icon={relatorio?.bateria?.conectada ? <BatteryCharging className={paleta.okText} /> : <Battery className={paleta.okText} />} temaClaro={temaClaro}>
              <InfoTooltip temaClaro={temaClaro} texto='O "tanque de energia" do seu equipamento. Indica se está a usar energia da tomada ou a descarregar.' />
              <div className={`text-4xl font-black mb-2 ${paleta.okText}`}>{relatorio?.bateria?.porcento}%</div>
              <p className={`text-[9px] uppercase font-bold ${temaClaro ? 'text-gray-500' : 'text-gray-400'}`}>{relatorio?.bateria?.conectada ? 'Ligado à Corrente' : 'A usar Bateria'}</p>
            </HardwareCard>
          )}

          <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className={`rounded-lg p-6 border flex flex-col justify-between transition-colors group cursor-pointer ${temaClaro ? 'bg-blue-50 border-blue-200 hover:border-blue-400' : 'bg-gradient-to-br from-blue-900 to-[#0a0a0a] border-blue-800/50 hover:border-blue-500'}`} onClick={() => setIsUpgradeModalOpen(true)}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg transition-colors ${temaClaro ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' : 'bg-blue-600/20 text-blue-400 group-hover:text-blue-300'}`}>
                  <Wrench size={32} />
                </div>
                <div>
                  <h3 className={`text-lg font-black tracking-wide mb-1 ${temaClaro ? 'text-blue-900' : 'text-white'}`}>PRECISANDO DE UM UPGRADE?</h3>
                  <p className={`text-sm leading-relaxed ${temaClaro ? 'text-gray-700' : 'text-gray-400'}`}>
                    A <strong className={temaClaro ? 'text-blue-700' : 'text-blue-400'}>Bytebros.TI</strong> é especialista em aumento de memória RAM, instalação de SSDs NVMe e montagem de setups completos. Pare de passar raiva com travamentos!
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-6 border flex flex-col justify-between transition-colors group cursor-pointer ${temaClaro ? `${paleta.okLightBg} ${paleta.okBorder}` : `bg-gradient-to-br ${paleta.okBg} to-[#0a0a0a] bg-opacity-10 border-gray-800`}`} onClick={() => setIsUpgradeModalOpen(true)}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg transition-colors ${temaClaro ? 'bg-white' : 'bg-[#1a1a1a]'} ${paleta.okText}`}>
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className={`text-lg font-black tracking-wide mb-1 ${temaClaro ? 'text-gray-900' : 'text-white'}`}>LIMPEZA E MANUTENÇÃO PREVENTIVA</h3>
                  <p className={`text-sm leading-relaxed ${temaClaro ? 'text-gray-700' : 'text-gray-400'}`}>
                    Seu notebook está esquentando muito ou fazendo barulho? Realizamos limpeza interna profunda e troca de pasta térmica de alta performance para evitar queimas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} temaClaro={temaClaro} />
      <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} temaClaro={temaClaro} setTemaClaro={setTemaClaro} modoDaltonismo={modoDaltonismo} setModoDaltonismo={setModoDaltonismo} />
      <RelatorioModal isOpen={isRelatorioOpen} onClose={() => setIsRelatorioOpen(false)} data={relatorio} temaClaro={temaClaro} modoDaltonismo={modoDaltonismo} />
    </div>
  );
}

export default App;