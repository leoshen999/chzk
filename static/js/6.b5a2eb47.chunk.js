(this.webpackJsonpchzk=this.webpackJsonpchzk||[]).push([[6,12,13],{15:function(e){e.exports=JSON.parse('[{"id":"sword","name":"\u5200","color":"rgb(213, 28, 28)","type":"melee"},{"id":"spear","name":"\u69cd","color":"rgb(210, 91, 12)","type":"melee"},{"id":"hammer","name":"\u69cc","color":"rgb(210, 12, 157)","type":"melee"},{"id":"shield","name":"\u76fe","color":"rgb(28, 81, 5)","type":"melee"},{"id":"gaunlets","name":"\u62f3","color":"rgb(163, 73, 164)","type":"melee"},{"id":"scythe","name":"\u938c","color":"rgb(22, 44, 44)","type":"melee"},{"id":"mace","name":"\u68cd","color":"rgb(91, 247, 54)","type":"melee"},{"id":"bow","name":"\u5f13","color":"rgb(38, 86, 208)","type":"ranged"},{"id":"crossbow","name":"\u77f3","color":"rgb(48, 43, 178)","type":"ranged"},{"id":"gun","name":"\u9244","color":"rgb(12, 156, 148)","type":"ranged"},{"id":"cannon","name":"\u5927","color":"rgb(56, 54, 55)","type":"ranged"},{"id":"dancing","name":"\u6b4c","color":"rgb(60, 173, 10)","type":"ranged"},{"id":"spell","name":"\u8853","color":"rgb(11, 140, 194)","type":"ranged"},{"id":"bell","name":"\u9234","color":"rgb(89, 12, 148)","type":"ranged"},{"id":"staff","name":"\u6756","color":"rgb(98, 160, 143)","type":"ranged"},{"id":"haraegushi","name":"\u7953","color":"rgb(139, 0, 0)","type":"ranged"},{"id":"book","name":"\u672c","color":"rgb(157, 171, 41)","type":"ranged"},{"id":"throwing","name":"\u6295","color":"rgb(247, 166, 60)","type":"both"},{"id":"whip","name":"\u97ad","color":"rgb(255, 125, 203)","type":"both"},{"id":"other","name":"\u4ed6","color":"rgb(127, 127, 127)","type":"other"}]')},16:function(e){e.exports=JSON.parse('[{"id":"plain","name":"\u5e73","color":"#00875f"},{"id":"hill","name":"\u5e73\u5c71","color":"#5f8700"},{"id":"mountain","name":"\u5c71","color":"#af5f00"},{"id":"water","name":"\u6c34","color":"#008787"},{"id":"hell","name":"\u5730\u7344","color":"#870087"},{"id":"none","name":"\u7121","color":"#808080"}]')},23:function(e,o,n){"use strict";n.r(o);var r=n(16),a=n(15),t={};a.forEach((function(e,o){t[e.id]=o}));var c={};function i(e){return e.id}function l(e){return e.terrains.length>0?c[e.terrains[0]]:999999999}function d(e){return t[e.weapon]}function m(e){return e.rarity}function u(e,o){return function(n,r){var a=e(n),t=e(r);return a!==t?o*(a-t):n.id-r.id}}r.forEach((function(e,o){c[e.id]=o}));var s=[{id:"id_asc",name:"No.\u25b2",color:"#005faf",usesSmallButton:!0,func:u(i,1)},{id:"id_desc",name:"No.\u25bc",color:"#005faf",usesSmallButton:!0,func:u(i,-1)},{id:"terrain_asc",name:"\u5730\u5f62\u25b2",color:"#00875f",usesSmallButton:!0,func:u(l,1)},{id:"terrain_desc",name:"\u5730\u5f62\u25bc",color:"#00875f",usesSmallButton:!0,func:u(l,-1)},{id:"weapon_asc",name:"\u6b66\u5668\u25b2",color:"#af0000",usesSmallButton:!0,func:u(d,1)},{id:"weapon_desc",name:"\u6b66\u5668\u25bc",color:"#af0000",usesSmallButton:!0,func:u(d,-1)},{id:"rarity_asc",name:"\u2605\u25b2",color:"#af5f00",usesSmallButton:!0,func:u(m,1)},{id:"rarity_desc",name:"\u2605\u25bc",color:"#af5f00",usesSmallButton:!0,func:u(m,-1)}];o.default=s}}]);