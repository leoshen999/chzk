(this.webpackJsonpchzk=this.webpackJsonpchzk||[]).push([[5,12,13,14],{17:function(e){e.exports=JSON.parse('[{"id":"sword","name":"\u5200","color":"rgb(213, 28, 28)","type":"melee"},{"id":"spear","name":"\u69cd","color":"rgb(210, 91, 12)","type":"melee"},{"id":"hammer","name":"\u69cc","color":"rgb(210, 12, 157)","type":"melee"},{"id":"shield","name":"\u76fe","color":"rgb(28, 81, 5)","type":"melee"},{"id":"gaunlets","name":"\u62f3","color":"rgb(163, 73, 164)","type":"melee"},{"id":"scythe","name":"\u938c","color":"rgb(22, 44, 44)","type":"melee"},{"id":"mace","name":"\u6226\u68cd","color":"rgb(91, 247, 54)","type":"melee"},{"id":"dual_sword","name":"\u53cc\u5263","color":"rgb(247, 21, 93)","type":"melee"},{"id":"bow","name":"\u5f13","color":"rgb(38, 86, 208)","type":"ranged"},{"id":"crossbow","name":"\u77f3\u5f13","color":"rgb(48, 43, 178)","type":"ranged"},{"id":"gun","name":"\u9244\u7832","color":"rgb(12, 156, 148)","type":"ranged"},{"id":"cannon","name":"\u5927\u7832","color":"rgb(56, 54, 55)","type":"ranged"},{"id":"dancing","name":"\u6b4c\u821e","color":"rgb(60, 173, 10)","type":"ranged"},{"id":"spell","name":"\u6cd5\u8853","color":"rgb(11, 140, 194)","type":"ranged"},{"id":"bell","name":"\u9234","color":"rgb(89, 12, 148)","type":"ranged"},{"id":"staff","name":"\u6756","color":"rgb(98, 160, 143)","type":"ranged"},{"id":"haraegushi","name":"\u7953\u4e32","color":"rgb(139, 0, 0)","type":"ranged"},{"id":"book","name":"\u672c","color":"rgb(157, 171, 41)","type":"ranged"},{"id":"throwing","name":"\u6295\u5263","color":"rgb(247, 166, 60)","type":"both"},{"id":"whip","name":"\u97ad","color":"rgb(255, 125, 203)","type":"both"},{"id":"jinkai","name":"\u9663\u8c9d","color":"rgb(8, 135, 44)","type":"both"},{"id":"other","name":"\u4ed6","color":"rgb(127, 127, 127)","type":"other"}]')},18:function(e){e.exports=JSON.parse('[{"id":"plain","name":"\u5e73","color":"#00875f"},{"id":"hill","name":"\u5e73\u5c71","color":"#5f8700"},{"id":"mountain","name":"\u5c71","color":"#af5f00"},{"id":"water","name":"\u6c34","color":"#008787"},{"id":"hell","name":"\u5730\u7344","color":"#870087"},{"id":"none","name":"\u7121","color":"#808080"}]')},21:function(e){e.exports=JSON.parse('[{"id":"hokkaido","name":"\u5317\u6d77\u9053","color":"#875faf"},{"id":"touhoku","name":"\u6771\u5317","color":"#875faf"},{"id":"kantou","name":"\u95a2\u6771","color":"#875faf"},{"id":"koushinetsu","name":"\u7532\u4fe1\u8d8a","color":"#875faf"},{"id":"hokuriku","name":"\u5317\u9678","color":"#875faf"},{"id":"toukai","name":"\u6771\u6d77","color":"#875faf"},{"id":"kinki","name":"\u8fd1\u757f","color":"#875faf"},{"id":"chuugoku","name":"\u4e2d\u56fd","color":"#875faf"},{"id":"shigoku","name":"\u56db\u56fd","color":"#875faf"},{"id":"kyuushuu","name":"\u4e5d\u5dde","color":"#875faf"},{"id":"okinawa","name":"\u6c96\u7e04","color":"#875faf"},{"id":"kaigai","name":"\u6d77\u5916","color":"#875faf"},{"id":"sonohoka","name":"\u305d\u306e\u4ed6","color":"#875faf"},{"id":"ikai","name":"\u7570\u754c","color":"#875faf"}]')},25:function(e,o,r){"use strict";r.r(o);var n=r(10);var a=r(12);var i,t=r(18),l=r(17),c=r(21),d=[{id:"terrain",filters:t.map((function(e){return{id:e.id,name:e.name,color:e.color,usesSmallButton:!0,func:function(o){return o.terrains.includes(e.id)}}}))},{id:"weapon",filters:l.map((function(e){return{id:e.id,img:"/chzk/oshirore/weapons/"+e.id+".png",name:e.name,color:e.color,usesSmallButton:!0,func:function(o){return o.weapon===e.id}}}))},{id:"rarity",filters:(i=Array(7).keys(),function(e){if(Array.isArray(e))return Object(n.a)(e)}(i)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(i)||Object(a.a)(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e){return e+1})).map((function(e){return{id:"rarity_"+e,name:"\u2605 "+e.toString(),color:"#af5f00",usesSmallButton:!0,func:function(o){return o.rarity===e}}}))},{id:"location",filters:c.map((function(e){return{id:e.id,name:e.name,color:e.color,usesSmallButton:!0,func:function(o){return o.location===e.id}}}))}];o.default=d}}]);