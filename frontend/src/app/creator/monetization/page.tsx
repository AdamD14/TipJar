"use client";
import { useEffect, useState } from 'react';
import { api } from '@/lib/apiClient';
import type { Goal, Tier } from '@/lib/types';
import GoalCard from '@/components/GoalCard';
import TierCard from '@/components/TierCard';
import TierModal from '@/components/TierModal';
import GoalModal from '@/components/GoalModal';

export default function MonetizationPage(){
  const [goals,setGoals]=useState<Goal[]>([]);
  const [tiers,setTiers]=useState<Tier[]>([]);
  const [openGoal,setOpenGoal]=useState(false);
  const [openTier,setOpenTier]=useState<null|Tier>(null);

  useEffect(()=>{ (async()=>{
    setGoals((await api<{items:Goal[]}>('/api/v1/goal?creator=me')).items || []);
    setTiers((await api<{items:Tier[]}>('/api/v1/subscriptions/tiers?creator=me')).items || []);
  })(); },[]);

  const onArchiveTier = async(id:string)=>{
    await api(`/api/v1/subscriptions/tiers/${id}/archive`, { method:'POST' });
    setTiers(v=>v.map(t=> t.id===id? {...t, active:false}: t));
  };

  return (
    <section className="space-y-8">
      {/* GOALS */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Goals</h2>
          <button onClick={()=>setOpenGoal(true)} className="px-3 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold text-sm">New goal</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {goals.map(g => <GoalCard key={g.id} g={g} />)}
          {!goals.length && <Empty title="No goals yet" action="Create your first goal" onClick={()=>setOpenGoal(true)} />}
        </div>
      </div>

      {/* TIERS */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Subscription tiers</h2>
          <button onClick={()=>setOpenTier({} as any)} className="px-3 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold text-sm">New tier</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map(t => <TierCard key={t.id} t={t} onEdit={(ti)=>setOpenTier(ti)} onArchive={onArchiveTier} />)}
          {!tiers.length && <Empty title="No tiers yet" action="Add your first tier" onClick={()=>setOpenTier({} as any)} />}
        </div>
      </div>

      {openGoal && <GoalModal onClose={()=>setOpenGoal(false)} onSaved={(g)=>setGoals(v=>[g,...v])}/>}
      {openTier && <TierModal initial={openTier?.id? openTier : undefined} onClose={()=>setOpenTier(null)} onSaved={(t)=>setTiers(v=> openTier?.id? v.map(x=>x.id===t.id? t:x): [t,...v])}/>}
    </section>
  );
}

function Empty({title,action,onClick}:{title:string;action:string;onClick:()=>void}){
  return <div className="col-span-full text-center text-white/70 py-10">
    <div className="mb-2">{title}</div>
    <button onClick={onClick} className="text-[#FFD700] underline underline-offset-4">{action}</button>
  </div>;
}
