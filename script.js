
const CONFIG = {
  firmName: "Nirmaan Advisors",
  auditorName: "Arvind Kulkarni",
  phone: "+91 9900579077",
  whatsapp: "919900579077", // digits only, country code first
  email: "ramtaxtechsolutions@gmail.com",
  officeAddress: "2nd Floor, Vidyanagar, Hubballi, Karnataka",
};

function waLink(message){
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ---------- NAV ---------- */
const siteNav = document.getElementById('siteNav');
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  siteNav.classList.toggle('scrolled', window.scrollY > 40);
  const h = document.documentElement;
  const pct = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight) * 100;
  scrollProgress.style.width = pct + '%';
}, {passive:true});

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
function openMenu(){ mobileMenu.classList.add('open'); hamburgerBtn.setAttribute('aria-expanded','true'); }
function closeMenu(){ mobileMenu.classList.remove('open'); hamburgerBtn.setAttribute('aria-expanded','false'); }
hamburgerBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ---------- REVEAL ON SCROLL ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); } });
}, {threshold:0.12});
revealEls.forEach(el => revealObs.observe(el));



/* ---------- ANIMATED COUNTERS ---------- */
const counters = document.querySelectorAll('.stat .num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '+';
    let cur = 0;
    const step = Math.max(1, Math.round(target/40));
    const tick = () => {
      cur += step;
      if(cur >= target){ el.textContent = target + suffix; return; }
      el.textContent = cur + suffix;
      requestAnimationFrame(tick);
    };
    tick();
    counterObs.unobserve(el);
  });
}, {threshold:0.4});
counters.forEach(c => counterObs.observe(c));

/* ---------- SERVICES DATA + RENDER ---------- */
const SERVICES = [
  {icon:'shield', title:'GST Services', desc:'Registration, monthly/quarterly returns and ongoing GST compliance.',
    includes:['GST registration & amendments','GSTR-1, GSTR-3B and annual returns','E-invoicing & e-way bill support','Notice & query handling'],
    who:'Any business crossing the GST turnover threshold, or voluntarily registering for input credit.',
    benefits:['Avoid late fees and interest','Stay input-tax-credit ready','One point of contact for GST matters'],
    docs:['PAN & Aadhaar','Business address proof','Bank account details','Sales/purchase records'],
    process:['Share basic business details','We review registration/filing status','Returns prepared and shared for approval','Filed before due date']},
  {icon:'audit', title:'Audit & Assurance', desc:'Statutory, internal and compliance audits with clear, actionable reporting.',
    includes:['Statutory audit','Internal audit','Financial statement review','Risk assessment'],
    who:'Companies, LLPs and firms with statutory audit requirements, or those wanting an internal health check.',
    benefits:['Independent view of financial controls','Early identification of risk areas','Audit-ready documentation'],
    docs:['Books of accounts','Bank statements','Prior year financials','Statutory registers'],
    process:['Planning & scope discussion','Fieldwork & documentation review','Findings discussed with management','Final report issued']},
  {icon:'tax', title:'Income Tax', desc:'Return filing, advisory and representation for individuals and businesses.',
    includes:['ITR filing (individuals, firms, companies)','Advance tax computation','Tax notice response','Capital gains computation'],
    who:'Salaried individuals, professionals, and businesses of any size.',
    benefits:['Accurate, on-time filing','Reduced risk of notices','Clarity on tax positions'],
    docs:['Form 16 / income proofs','Bank statements','Investment proofs','PAN'],
    process:['Share income & investment details','Draft computation shared for review','Return filed & acknowledgement shared','Support for any follow-up notices']},
  {icon:'ledger', title:'Accounting & Bookkeeping', desc:'Day-to-day books, reconciliations and MIS you can rely on.',
    includes:['Monthly bookkeeping','Bank reconciliation','Payables/receivables tracking','MIS reports'],
    who:'Businesses that want accurate, current books without hiring an in-house team.',
    benefits:['Real-time view of finances','Cleaner audits and filings','Better decision-making data'],
    docs:['Sales & purchase invoices','Bank statements','Expense receipts','Prior books (if any)'],
    process:['Books & systems reviewed','Monthly entries and reconciliations','Reports shared monthly','Ongoing query support']},
  {icon:'tds', title:'TDS & Compliance', desc:'TDS deduction, deposit and quarterly return filing, done right.',
    includes:['TDS applicability review','Quarterly TDS returns','Form 16/16A issuance','Correction statements'],
    who:'Employers and businesses making payments where TDS applies.',
    benefits:['Avoid disallowance of expenses','Timely, penalty-free compliance','Clean TDS credit for vendors/employees'],
    docs:['Payment/salary records','PAN of deductees','Challan details'],
    process:['Applicability check','Deduction & deposit tracking','Quarterly return preparation','Filing & certificate issuance']},
  {icon:'building', title:'Business Registration', desc:'Choosing and setting up the right structure for your business.',
    includes:['Proprietorship/Partnership/LLP/Pvt Ltd setup','MSME/Udyam registration','PAN/TAN application','Licence guidance'],
    who:'New businesses and founders deciding how to structure their venture.',
    benefits:['Right structure for your goals','Faster, correctly filed paperwork','Fewer compliance surprises later'],
    docs:['ID & address proof of promoters','Proposed business address proof','Passport photos'],
    process:['Structure discussion','Document collection','Application filing','Registration certificate delivered']},
  {icon:'plan', title:'Tax Planning', desc:'Legitimate, forward-looking planning to manage your tax position.',
    includes:['Investment & deduction planning','Salary structuring','Entity-level tax strategy','Capital gains planning'],
    who:'Individuals and businesses wanting to plan ahead rather than react at year-end.',
    benefits:['Better use of available deductions','Fewer year-end surprises','Decisions grounded in your numbers'],
    docs:['Income details','Existing investments','Business financials (if applicable)'],
    process:['Review current position','Identify applicable options','Plan discussed & agreed','Implementation support']},
  {icon:'advice', title:'Financial Advisory', desc:'Practical guidance on financial structuring and business decisions.',
    includes:['Financial health review','Budgeting & forecasting support','Funding readiness','Cost structure review'],
    who:'Growing businesses making decisions about funding, structure or expansion.',
    benefits:['Clearer financial picture','Better-prepared for lenders/investors','Grounded, practical recommendations'],
    docs:['Recent financial statements','Business plan (if available)','Bank statements'],
    process:['Discovery conversation','Review of financial data','Recommendations presented','Ongoing advisory as needed']},
];

const ICONS = {
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/>',
  audit:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  tax:'<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  ledger:'<path d="M4 4h16v16H4z"/><path d="M4 9h16M9 9v11"/>',
  tds:'<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>',
  building:'<path d="M4 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/>',
  plan:'<path d="M3 12h4l3-9 4 18 3-9h4"/>',
  advice:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'
};

const svcGrid = document.getElementById('svcGrid');
SERVICES.forEach((s, i) => {
  const card = document.createElement('button');
  card.className = 'svc-card';
  card.innerHTML = `
    <div class="svc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[s.icon]}</svg></div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <span class="svc-more">Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>`;
  card.addEventListener('click', () => openServiceModal(i));
  svcGrid.appendChild(card);
});

const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

function openServiceModal(i){
  const s = SERVICES[i];
  modalBody.innerHTML = `
    <span class="tag">SERVICE</span>
    <h3>${s.title}</h3>
    <p style="color:var(--ink-soft); font-size:15px;">${s.desc}</p>
    <div class="modal-block"><h4>What's included</h4><ul>${s.includes.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="modal-block"><h4>Who needs this</h4><p style="font-size:14.5px; color:var(--ink-soft);">${s.who}</p></div>
    <div class="modal-block"><h4>Benefits</h4><ul>${s.benefits.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="modal-block"><h4>Documents typically required</h4><ul>${s.docs.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="modal-block"><h4>Process</h4><ol>${s.process.map(x=>`<li>${x}</li>`).join('')}</ol></div>
    <div class="modal-block"><a href="#contact" class="btn btn-primary" id="modalCta">Enquire about this service</a></div>
  `;
  modalOverlay.classList.add('open');
  document.getElementById('modalCta').addEventListener('click', closeModal);
}
function closeModal(){ modalOverlay.classList.remove('open'); }

/* ---------- GST READINESS TOOL ---------- */
const gstAnswers = { type:null, registered:null, filed:null, einvoice:null };
document.querySelectorAll('.pill-row[data-q]').forEach(row => {
  row.addEventListener('click', (e) => {
    const btn = e.target.closest('.pill');
    if(!btn) return;
    row.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    gstAnswers[row.dataset.q] = btn.dataset.v;
  });
});

document.getElementById('gstCalcBtn').addEventListener('click', () => {
  const turnover = parseFloat(document.getElementById('turnoverInput').value) || 0;
  let score = 40; // base
  const details = [];

  if(gstAnswers.registered === 'Yes'){ score += 20; details.push('✓ Registration in place'); }
  else if(gstAnswers.registered === 'No' && turnover > 4000000){ score -= 15; details.push('⚠ Turnover may require GST registration'); }
  else { details.push('— Registration not applicable or pending review'); }

  if(gstAnswers.filed === 'Yes'){ score += 20; details.push('✓ Returns are being filed regularly'); }
  else if(gstAnswers.filed === 'No'){ score -= 15; details.push('⚠ Irregular filing increases compliance risk'); }
  else { details.push('— Filing status not yet confirmed'); }

  if(gstAnswers.einvoice === 'Yes'){ score += 10; details.push('✓ E-invoicing considered'); }
  else if(gstAnswers.einvoice === 'Not Sure'){ score -= 5; details.push('⚠ Check whether e-invoicing applies to you'); }

  if(!gstAnswers.type){ details.unshift('— Select a business type for a more accurate score'); }

  score = Math.max(5, Math.min(100, score));

  document.getElementById('scoreNum').textContent = score;
  document.getElementById('scoreRing').style.setProperty('--pct', score);
  document.getElementById('scoreLabel').textContent =
    score >= 80 ? 'Good shape — a few refinements possible' :
    score >= 55 ? 'Reasonable, but some gaps to address' :
    'Meaningful compliance risk — review recommended';
  document.getElementById('scoreDetails').innerHTML = details.map(d => `<li>${d}</li>`).join('');
});

/* ---------- TAX CALCULATOR (illustrative slabs, configurable) ---------- */
const TAX_SLABS = {
  'Individual': [
    {upto:400000, rate:0}, {upto:800000, rate:0.05}, {upto:1200000, rate:0.10},
    {upto:1600000, rate:0.15}, {upto:2000000, rate:0.20}, {upto:2400000, rate:0.25}, {upto:Infinity, rate:0.30}
  ],
  'HUF': [
    {upto:400000, rate:0}, {upto:800000, rate:0.05}, {upto:1200000, rate:0.10},
    {upto:1600000, rate:0.15}, {upto:2000000, rate:0.20}, {upto:2400000, rate:0.25}, {upto:Infinity, rate:0.30}
  ],
  'Partnership / LLP': [ {upto:Infinity, rate:0.30} ],
  'Company': [ {upto:Infinity, rate:0.25} ],
};
function estimateTax(taxableIncome, type){
  const slabs = TAX_SLABS[type] || TAX_SLABS['Individual'];
  let tax = 0, prev = 0;
  for(const slab of slabs){
    if(taxableIncome > prev){
      const chunk = Math.min(taxableIncome, slab.upto) - prev;
      tax += chunk * slab.rate;
      prev = slab.upto;
    } else break;
  }
  return Math.round(tax + tax*0.04); // + illustrative 4% cess
}
document.getElementById('calcBtn').addEventListener('click', () => {
  const income = parseFloat(document.getElementById('calcIncome').value) || 0;
  const other = parseFloat(document.getElementById('calcOther').value) || 0;
  const deductions = parseFloat(document.getElementById('calcDeductions').value) || 0;
  const type = document.getElementById('calcType').value;
  const taxable = Math.max(0, income + other - deductions);
  const tax = estimateTax(taxable, type);
  document.getElementById('calcOutput').textContent = '₹ ' + tax.toLocaleString('en-IN');
  document.getElementById('calcSlab').textContent = `Based on taxable income of ₹${taxable.toLocaleString('en-IN')} (${type}), including illustrative cess.`;
});

/* ---------- DEADLINE CALENDAR ---------- */
const DEADLINES = [
  {cat:'GST', title:'GSTR-1', due:'11th of every month', detail:'Outward supply return for regular taxpayers filing monthly.'},
  {cat:'GST', title:'GSTR-3B', due:'20th of every month', detail:'Summary return with tax payment for the period.'},
  {cat:'GST', title:'GSTR-9 (Annual)', due:'31 December', detail:'Annual GST return for regular taxpayers above the threshold.'},
  {cat:'TDS', title:'TDS Return (24Q/26Q)', due:'Quarterly — 31st of month after quarter end', detail:'Quarterly statement of tax deducted at source.'},
  {cat:'Income Tax', title:'ITR Filing (non-audit cases)', due:'31 July', detail:'Income tax return for individuals not requiring audit.'},
  {cat:'Income Tax', title:'ITR Filing (audit cases)', due:'31 October', detail:'Income tax return where audit is applicable.'},
  {cat:'Advance Tax', title:'Advance Tax — Q1', due:'15 June', detail:'15% of estimated annual tax liability.'},
  {cat:'Advance Tax', title:'Advance Tax — Q2', due:'15 September', detail:'45% of estimated annual tax liability (cumulative).'},
];
const calList = document.getElementById('calList');
function renderCalendar(filter){
  calList.innerHTML = '';
  DEADLINES.filter(d => filter === 'all' || d.cat === filter).forEach(d => {
    const item = document.createElement('div');
    item.className = 'cal-item';
    item.innerHTML = `
  <div class="cal-left">
    <span class="cal-tag">${d.cat}</span>
    <div>
      <div class="cal-title">${d.title}</div>
      <div class="cal-due">Due: ${d.due}</div>
    </div>
  </div>
`;
    const detail = document.createElement('div');
    detail.className = 'cal-detail';
    detail.innerHTML = `<p>${d.detail}</p><button class="btn btn-ghost btn-sm cal-remind" type="button">Add reminder</button>`;
    item.appendChild(detail);
    item.addEventListener('click', (e) => {
      if(e.target.closest('.cal-remind')){ e.target.textContent = 'Reminder set ✓'; e.target.disabled = true; return; }
      item.classList.toggle('open');
    });
    calList.appendChild(item);
  });
}
renderCalendar('all');
document.getElementById('calFilters').addEventListener('click', (e) => {
  const btn = e.target.closest('.pill');
  if(!btn) return;
  document.querySelectorAll('#calFilters .pill').forEach(p => { p.style.background=''; p.style.color='var(--ink)'; p.style.borderColor='var(--line)'; });
  btn.style.background = 'var(--ink)'; btn.style.color = '#fff'; btn.style.borderColor='var(--ink)';
  renderCalendar(btn.dataset.cat);
});

/* ---------- HOW WE WORK TIMELINE REVEAL ---------- */
const tlSteps = document.querySelectorAll('.tl-step');
const tlObs = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('in'), i*120); tlObs.unobserve(e.target); } });
}, {threshold:0.3});
tlSteps.forEach(s => tlObs.observe(s));

/* ---------- AUDIT PROCESS ---------- */
const AUDIT_STAGES = [
  {title:'Documents', detail:'Collecting books of accounts, statements and supporting records.'},
  {title:'Review', detail:'Checking completeness, accuracy and internal consistency.'},
  {title:'Analysis', detail:'Examining transactions, controls and areas of risk.'},
  {title:'Findings', detail:'Identifying issues, gaps and improvement opportunities.'},
  {title:'Report', detail:'Documenting observations and recommendations clearly.'},
  {title:'Action', detail:'Supporting implementation of agreed corrective steps.'},
];
const auditProcess = document.getElementById('auditProcess');
AUDIT_STAGES.forEach((st, i) => {
  const el = document.createElement('div');
  el.className = 'ap-stage';
  el.innerHTML = `<div class="ap-num">${String(i+1).padStart(2,'0')}</div>
    <div class="ap-body"><h4>${st.title}</h4><div class="ap-more"><p>${st.detail}</p></div></div>`;
  el.addEventListener('click', () => el.classList.toggle('active'));
  el.addEventListener('mouseenter', () => el.classList.add('active'));
  el.addEventListener('mouseleave', () => el.classList.remove('active'));
  auditProcess.appendChild(el);
});

/* ---------- TAX PLANNING CARDS ---------- */
const PLANS = [
  {title:'Individuals', desc:'Salary structuring and deduction planning for salaried and self-employed individuals.'},
  {title:'Professionals', desc:'Presumptive taxation review and expense planning for doctors, consultants and freelancers.'},
  {title:'Startups', desc:'Entity structuring, funding-readiness and early-stage compliance planning.'},
  {title:'Small Businesses', desc:'Cash flow-friendly tax planning aligned with day-to-day operations.'},
  {title:'Growing Companies', desc:'Structuring for scale, including TDS, GST and corporate tax considerations.'},
];
const planGrid = document.getElementById('planGrid');
PLANS.forEach(p => {
  const card = document.createElement('div');
  card.className = 'plan-card';
  card.innerHTML = `<h4>${p.title}</h4><button class="plan-toggle" type="button">Explore →</button><div class="plan-more"><p>${p.desc}</p></div>`;
  card.querySelector('.plan-toggle').addEventListener('click', () => card.classList.toggle('open'));
  planGrid.appendChild(card);
});

/* ---------- WHY CHOOSE US ---------- */
const WHY = [
  {n:'01', t:'Accuracy', d:'Careful, detail-checked work across filings, returns and reports.'},
  {n:'02', t:'Transparency', d:'Clear communication on scope, timelines and fees, upfront.'},
  {n:'03', t:'Personal Attention', d:'You work directly with your advisor, not a rotating team.'},
  {n:'04', t:'Timely Compliance', d:'Filings tracked and completed ahead of deadlines.'},
  {n:'05', t:'Confidentiality', d:'Your financial information is handled with strict discretion.'},
  {n:'06', t:'Practical Advice', d:'Recommendations grounded in your actual numbers, not generic tips.'},
];
const whyGrid = document.getElementById('whyGrid');
WHY.forEach(w => {
  const el = document.createElement('div');
  el.className = 'why-item';
  el.innerHTML = `<span class="wn">${w.n}</span><h4>${w.t}</h4><div class="why-more"><p>${w.d}</p></div>`;
  el.addEventListener('click', () => {
    const already = el.classList.contains('active');
    document.querySelectorAll('.why-item').forEach(i => i.classList.remove('active'));
    if(!already) el.classList.add('active');
  });
  whyGrid.appendChild(el);
});

/* ---------- CLIENT JOURNEY ---------- */
const JOURNEY = [
  {n:'STEP 1', t:'Enquiry', d:'You reach out via form, call or WhatsApp.'},
  {n:'STEP 2', t:'Consultation', d:'We discuss your needs and scope the work.'},
  {n:'STEP 3', t:'Document Collection', d:'You share the required documents securely.'},
  {n:'STEP 4', t:'Analysis', d:'We review and prepare the necessary work.'},
  {n:'STEP 5', t:'Work Completed', d:'Filings, reports or advice finalised.'},
  {n:'STEP 6', t:'Report / Filing', d:'Submitted and shared with you for records.'},
  {n:'STEP 7', t:'Ongoing Support', d:'We stay available for follow-ups and future needs.'},
];
const journeyWrap = document.getElementById('journeyWrap');
JOURNEY.forEach(j => {
  const el = document.createElement('div');
  el.className = 'j-step';
  el.innerHTML = `<div class="jn">${j.n}</div><h4>${j.t}</h4><p>${j.d}</p>`;
  journeyWrap.appendChild(el);
});



/* ---------- FAQ ---------- */
const FAQS = [
  {q:'What services do you provide?', a:'GST registration and filing, income tax, audit, accounting, TDS compliance, business registration and financial advisory.'},
  {q:'Who needs GST registration?', a:'Businesses above the applicable turnover threshold, or those who register voluntarily to claim input tax credit.'},
  {q:'How often should GST returns be filed?', a:'Most regular taxpayers file monthly (GSTR-1, GSTR-3B), with an annual return depending on turnover and scheme.'},
  {q:'What documents are required for GST registration?', a:'PAN, Aadhaar, address proof, bank details, photographs and relevant business documents.'},
  {q:'Do you provide income tax filing?', a:'Yes, for individuals, professionals, firms and companies, along with related advisory.'},
  {q:'Do you provide audit services?', a:'Yes — statutory, internal and compliance audits, along with financial statement review.'},
  {q:'Can you handle monthly accounting?', a:'Yes, including bookkeeping, reconciliations and monthly MIS reporting.'},
  {q:'Do you provide business advisory?', a:'Yes, covering financial structuring, budgeting and funding-readiness support.'},
  {q:'How can I book a consultation?', a:'Use the consultation form below, or reach out directly via WhatsApp or phone.'},
];
const faqList = document.getElementById('faqList');
FAQS.forEach(f => {
  const item = document.createElement('div');
  item.className = 'faq-item';
  item.innerHTML = `
    <button class="faq-q" type="button" aria-expanded="false">
      ${f.q}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
    <div class="faq-a"><p>${f.a}</p></div>`;
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  faqList.appendChild(item);
});

/* ---------- DOCUMENT CHECKLIST ---------- */
const CHECKLISTS = {
  'GST Registration': ['PAN','Aadhaar','Address proof','Bank details','Photograph','Business documents'],
  'Income Tax Filing': ['PAN','Form 16 / income proof','Bank statements','Investment proofs','Aadhaar'],
  'Audit': ['Books of accounts','Bank statements','Prior year financials','Statutory registers'],
  'Business Registration': ['ID & address proof of promoters','Business address proof','Passport photos','PAN'],
  'Accounting': ['Sales & purchase invoices','Bank statements','Expense receipts','Prior books (if any)'],
};
const docTabs = document.getElementById('docTabs');
const docPanel = document.getElementById('docPanel');
Object.keys(CHECKLISTS).forEach((key, i) => {
  const btn = document.createElement('button');
  btn.className = 'pill';
  btn.style.cssText = 'color:var(--ink); border-color:var(--line);';
  btn.textContent = key;
  btn.addEventListener('click', () => renderChecklist(key, btn));
  docTabs.appendChild(btn);
  if(i===0){ renderChecklist(key, btn); }
});
function renderChecklist(key, activeBtn) {
  // Reset all buttons
  document.querySelectorAll('#docTabs .pill').forEach(p => {
    p.style.background = '';
    p.style.color = 'var(--ink)';
    p.style.borderColor = 'var(--line)';
  });

  // Selected button = GOLD
  activeBtn.style.background = '#c99a2e';
  activeBtn.style.color = '#fff';
  activeBtn.style.borderColor = '#c99a2e';

  const items = CHECKLISTS[key];

  docPanel.innerHTML = `
    <h4 style="margin-bottom:16px;">${key}</h4>

    <ul>
      ${items.map(d => `
        <li>
          <svg width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor"
               stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          ${d}
        </li>
      `).join('')}
    </ul>

    <button
      class="btn btn-accent btn-sm"
      style="margin-top:22px;"
      id="sendChecklistBtn">
      Send Checklist to WhatsApp
    </button>
  `;

  document.getElementById('sendChecklistBtn').addEventListener('click', () => {
    const msg =
      `Hello, I'd like the document checklist for: ${key}\n\n` +
      items.map(i => '- ' + i).join('\n');

    window.open(waLink(msg), '_blank');
  });
}

/* ---------- LEAD FORM ---------- */
const leadForm = document.getElementById('leadForm');
function validateField(field, condition){
  field.classList.toggle('has-err', !condition);
  return condition;
}
leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fName');
  const phone = document.getElementById('fPhone');
  const email = document.getElementById('fEmail');
  const okName = validateField(name.closest('.field'), name.value.trim().length > 1);
  const okPhone = validateField(phone.closest('.field'), /^[\d+\-\s]{8,15}$/.test(phone.value.trim()));
  const okEmail = validateField(email.closest('.field'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
  if(okName && okPhone && okEmail){
    document.getElementById('formStatus').classList.add('show');
    leadForm.reset();
  }
});


/* ---------- SEND COMPLETE FORM TO WHATSAPP ---------- */

const waFormBtn = document.getElementById('waFormBtn');

if (waFormBtn) {
  waFormBtn.addEventListener('click', function (e) {

    // Prevent form submission/reload
    e.preventDefault();

    // Get all form values
    const name = document.getElementById('fName')?.value.trim() || '';
    const phone = document.getElementById('fPhone')?.value.trim() || '';
    const email = document.getElementById('fEmail')?.value.trim() || '';

    const business =
      document.getElementById('fBiz')?.value || 'Not specified';

    const service =
      document.getElementById('fService')?.value || 'Not specified';

    const contactMethod =
      document.getElementById('fContact')?.value || 'Not specified';

    const message =
      document.getElementById('fMsg')?.value.trim() ||
      'No additional message';


    /* ---------- VALIDATION ---------- */

    if (!name) {
      alert('Please enter your name.');
      document.getElementById('fName')?.focus();
      return;
    }

    if (!phone) {
      alert('Please enter your phone number.');
      document.getElementById('fPhone')?.focus();
      return;
    }

    if (!email) {
      alert('Please enter your email address.');
      document.getElementById('fEmail')?.focus();
      return;
    }


    /* ---------- CREATE WHATSAPP MESSAGE ---------- */

const whatsappMessage =
`Hello ${CONFIG.auditorName},

I would like to request a consultation.

━━━━━━━━━━━━━━━━━━
*CLIENT INFORMATION*
━━━━━━━━━━━━━━━━━━

*Name*: ${name}
*Phone*: ${phone}
*Email*: ${email}

*Business Type*: ${business}

*Service Required*: ${service}

*Preferred Contact Method*: ${contactMethod}

━━━━━━━━━━━━━━━━━━
*MESSAGE*
━━━━━━━━━━━━━━━━━━

${message}`;


    /* ---------- ENCODE MESSAGE ---------- */

    const encodedMessage =
      encodeURIComponent(whatsappMessage);


    /* ---------- WHATSAPP NUMBER ---------- */

    const whatsappNumber =
      CONFIG.whatsapp;


    /* ---------- CREATE WHATSAPP URL ---------- */

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


    /* ---------- OPEN WHATSAPP ---------- */

    window.open(whatsappURL, '_blank');

  });
}

/* ---------- WHATSAPP CONFIG WIRING ---------- */
document.getElementById('waFloat').href = waLink('Hello, I would like to enquire about your services.');
document.getElementById('footWaLink').href = waLink('Hello, I would like to enquire about your services.');
document.getElementById('directionsBtn').href = 'https://www.google.com/maps/place/TRENDS/@13.2546,77.7143729,17z/data=!4m10!1m2!2m1!1s2nd+Floor,+Trends+BuildingOpp.+D-Mart,+B.B.+Road+Devanahalli,+Bengaluru+-+562110!3m6!1s0x3bb1e35b9b0d8993:0x91d6a115cab8a655!8m2!3d13.255123!4d77.7166216!15sClAybmQgRmxvb3IsIFRyZW5kcyBCdWlsZGluZ09wcC4gRC1NYXJ0LCBCLkIuIFJvYWQgRGV2YW5haGFsbGksIEJlbmdhbHVydSAtIDU2MjExMCIDiAEBWkoiSDJuZCBmbG9vciB0cmVuZHMgYnVpbGRpbmdvcHAgZCBtYXJ0IGJiIHJvYWQgZGV2YW5haGFsbGkgYmVuZ2FsdXJ1IDU2MjExMJIBDmNsb3RoaW5nX3N0b3Jl4AEA!16s%2Fg%2F11j98czknx?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D' + encodeURIComponent(CONFIG.officeAddress);
document.getElementById('directionsBtn').target = '_blank';

/* ---------- FOOTER YEAR ---------- */
document.getElementById('yearNow').textContent = new Date().getFullYear();
/* =========================================
   OFFICE IMAGE LIGHTBOX
========================================= */

const officeImages = [
  "Assets/reception.jpeg",
  "Assets/work.jpeg",
  "Assets/consultation.jpeg",
  "Assets/front.jpeg",
  "Assets/meeting.jpeg",
  "Assets/private.jpeg"
];

let currentOfficeImage = 0;

const officeLightbox =
  document.getElementById("officeLightbox");

const officeLightboxImage =
  document.getElementById("officeLightboxImage");

const officeImageCounter =
  document.getElementById("officeImageCounter");


function openOfficeGallery(index) {

  currentOfficeImage = index;

  updateOfficeImage();

  officeLightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}


function updateOfficeImage() {

  officeLightboxImage.src =
    officeImages[currentOfficeImage];

  officeImageCounter.textContent =
    `${currentOfficeImage + 1} / ${officeImages.length}`;
}


function nextOfficeImage() {

  currentOfficeImage++;

  if (currentOfficeImage >= officeImages.length) {
    currentOfficeImage = 0;
  }

  updateOfficeImage();
}


function previousOfficeImage() {

  currentOfficeImage--;

  if (currentOfficeImage < 0) {
    currentOfficeImage = officeImages.length - 1;
  }

  updateOfficeImage();
}


function closeOfficeGallery() {

  officeLightbox.classList.remove("active");

  document.body.style.overflow = "";
}


/* Close by clicking outside image */

officeLightbox.addEventListener("click", function(event) {

  if (event.target === officeLightbox) {
    closeOfficeGallery();
  }

});


/* Keyboard controls */

document.addEventListener("keydown", function(event) {

  if (!officeLightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeOfficeGallery();
  }

  if (event.key === "ArrowRight") {
    nextOfficeImage();
  }

  if (event.key === "ArrowLeft") {
    previousOfficeImage();
  }

});
