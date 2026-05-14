"use client";

import React, { useState } from 'react';
import { 
  UsersRound, 
  ShieldCheck, 
  UserPlus, 
  MoreVertical, 
  ShieldAlert, 
  Eye, 
  Edit3, 
  Lock,
  Search,
  CheckCircle2
} from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: 'Karol Mod', role: 'Moderator', permissions: ['Wiadomości', 'Alertsy'], status: 'Online' },
  { id: 2, name: 'Marek Editor', role: 'Editor', permissions: ['Studio', 'Profile'], status: 'Offline' },
  { id: 3, name: 'Ewa Manager', role: 'Admin', permissions: ['Finanse', 'Analityka', 'Ustawienia'], status: 'Online' },
];

const TeamPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Mój Zespół</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj dostępem do swojego Creator Studio dla innych osób.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold font-heading text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">
           <UserPlus size={18} /> Zaproś Członka
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
         {/* PERMISSIONS OVERVIEW (PDF str. 46) */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
               <h3 className="font-bold font-heading text-teal-25 text-sm uppercase tracking-widest">Role Dostępne</h3>
               <div className="space-y-3">
                  {['Administrator', 'Manager', 'Moderator', 'Editor'].map(role => (
                    <div key={role} className="flex items-center justify-between p-4 bg-teal-700 rounded-md group hover:bg-teal-600 transition-all cursor-pointer">
                       <span className="text-xs font-bold text-teal-50 group-hover:text-teal-25">{role}</span>
                       <CheckCircle2 size={14} className="text-teal-500 group-hover:text-teal-25" />
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-teal-100 font-medium italic">Każda rola posiada predefiniowany zestaw uprawnień, który możesz edytować.</p>
            </div>

            <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
               <ShieldCheck size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
               <p className="text-[10px] font-bold text-success-400 uppercase tracking-widest mb-4">Bezpieczeństwo Zespołu</p>
               <div className="flex items-center gap-3">
                  <Lock size={20} className="text-success-400" />
                  <p className="text-sm font-bold">Logowanie 2FA wymagane dla wszystkich członków.</p>
               </div>
            </div>
         </div>

         {/* MEMBERS LIST (PDF str. 47) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
               <div className="p-8 border-b border-teal-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h3 className="font-bold font-heading text-xl italic text-teal-25">Aktywni Członkowie</h3>
                  <div className="relative w-full sm:w-64">
                     <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-100" />
                     <input type="text" placeholder="Szukaj w zespole..." className="w-full bg-teal-700 border border-teal-700 rounded-md pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none" />
                  </div>
               </div>
               
               <div className="overflow-x-auto flex-1">
                  <table className="w-full">
                     <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Użytkownik</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Rola</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Uprawnienia</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-widest">Status</th></tr></thead>
                     <tbody className="divide-y divide-teal-700">
                        {TEAM_MEMBERS.map(member => (
                          <tr key={member.id} className="hover:bg-teal-700/50 transition-colors group">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center font-bold text-teal-500">{member.name[0]}</div>
                                  <span className="text-sm font-bold text-teal-25">{member.name}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6"><span className="px-3 py-1 bg-teal-700 rounded-full text-[9px] font-bold uppercase tracking-widest text-teal-50">{member.role}</span></td>
                            <td className="px-8 py-6">
                               <div className="flex gap-1 flex-wrap">
                                  {member.permissions.map(p => <span key={p} className="text-[10px] text-teal-100 font-bold">#{p}</span>)}
                               </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex items-center justify-end gap-2">
                                  <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-success-base animate-pulse' : 'bg-teal-100'}`} />
                                  <span className="text-xs font-bold text-teal-100">{member.status}</span>
                                  <button className="ml-4 p-2 hover:bg-teal-600 rounded-md text-teal-100 transition-all"><MoreVertical size={16} /></button>
                               </div>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TeamPage;
