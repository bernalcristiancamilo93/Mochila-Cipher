"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5289],{5289:(x,I,f)=>{f.r(I),f.d(I,{CifradoPageModule:()=>E});var P=f(4755),t=f(5030),n=f(7002),A=f(2852),o=f(3020);const M=[{path:"",component:(()=>{class c{constructor(i){this.alertCtrl=i,this.claveForm=new t.cw({mochilaFacil:new t.NI("2,5,8,17,34,71",t.kI.required),valorW:new t.NI("137",t.kI.required),valorT:new t.NI("43",t.kI.required),mochilaDificil:new t.NI}),this.cifradoForm=new t.cw({textoClaroInputAscii:new t.NI("s\xb0",t.kI.required),textoClaroEnBits:new t.NI,textoClaroEnBitsEnBloque:new t.NI,bitsTextoClaroCifrados:new t.NI,textoCifradoOutputAscii:new t.NI}),this.descifradoForm=new t.cw({textoCifradoInputAscii:new t.NI("",t.kI.required),textoCifradoFormatoBits:new t.NI,bitsTextoCifradoEnClaro:new t.NI,textoClaroOutputAscii:new t.NI})}verificarMochila(){var i,e;const l=null===(i=this.claveForm.get("mochilaFacil"))||void 0===i||null===(e=i.value)||void 0===e?void 0:e.split(",").map(a=>+a);let r=0;for(let a=0;a<(null==l?void 0:l.length)-1;a++)if(r+=l[a],r>=l[a+1])return void this.notificacionError("Los valores de la mochila no son correctos.")}totalMochila(){var i,e;const l=null===(i=this.claveForm.get("mochilaFacil"))||void 0===i||null===(e=i.value)||void 0===e?void 0:e.split(",").map(a=>+a);let r=0;for(let a=1;a<(null==l?void 0:l.length);a++)r+=l[a];return r}verificarW(){var i;+(null===(i=this.claveForm.get("valorW"))||void 0===i?void 0:i.value)<=this.totalMochila()&&this.notificacionError("El valor de w no es v\xe1lido.")}verificarT(){var i,e;const l=+(null===(i=this.claveForm.get("valorW"))||void 0===i?void 0:i.value),r=+(null===(e=this.claveForm.get("valorT"))||void 0===e?void 0:e.value);0<r&&r<l?this.esPrimoRelativo(r,l):this.notificacionError("El valor de t no es menor que w.")}calcularTInversa(){var i,e;const l=+(null===(i=this.claveForm.get("valorW"))||void 0===i?void 0:i.value),r=+(null===(e=this.claveForm.get("valorT"))||void 0===e?void 0:e.value);let a=0;for(let s=1;s<l;s++)if((s*l+1)%r==0){a=(s*l+1)/r;break}return a}calcularMochilaDificil(){var i,e,l,r,a;const s=+(null===(i=this.claveForm.get("valorT"))||void 0===i?void 0:i.value),g=+(null===(e=this.claveForm.get("valorW"))||void 0===e?void 0:e.value),$=null===(l=this.claveForm.get("mochilaFacil"))||void 0===l||null===(r=l.value)||void 0===r?void 0:r.split(",").map(u=>+u),m=[];for(const u of $)m.push(u*s%g);null===(a=this.claveForm.get("mochilaDificil"))||void 0===a||a.patchValue(m)}cifrar(){var i,e,l,r,a,s,g;const $=null===(i=this.cifradoForm.get("textoClaroInputAscii"))||void 0===i?void 0:i.value.replace(/\s/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!\xa1\xbf?]/g,"").split(""),m=[],u=[];for(const d of $)m.push(d.charCodeAt(0));console.log("Valores Ascii: ",m);for(const d of m){const _=d.toString(2).split("").map(Z=>+Z);u.push(this.verificarVector(_,8))}const F=[];for(const d of u)F.push(d.toString().replace(/,/g,""));null===(e=this.cifradoForm.get("textoClaroEnBits"))||void 0===e||e.patchValue(F);const T=null===(l=this.claveForm.get("mochilaFacil"))||void 0===l||null===(r=l.value)||void 0===r?void 0:r.split(",").length;console.log(T);const v=u.join().replace(/,/g,"").match(/.{1,6}/g).map(d=>d.split("").map(_=>+_)),b=u.join().replace(/,/g,"").match(/.{1,6}/g);console.log(u),console.log(v),null===(a=this.cifradoForm.get("textoClaroEnBitsEnBloque"))||void 0===a||a.patchValue(b);const h=null===(s=this.claveForm.get("mochilaDificil"))||void 0===s?void 0:s.value,w=[];for(const d of v){let _=0;for(const[Z,B]of h.entries())_+=B*d[Z];w.push(_)}const J=w.map(d=>d.toString(2)).join().replace(/,/g,"").match(/.{1,8}/g);console.log(w),console.log(J),null===(g=this.cifradoForm.get("textoCifradoOutputAscii"))||void 0===g||g.patchValue(w)}descifrar(){var i,e,l,r,a;const s=null===(i=this.descifradoForm.get("textoCifradoInputAscii"))||void 0===i?void 0:i.value.split(","),g=this.calcularTInversa(),$=+(null===(e=this.claveForm.get("valorW"))||void 0===e?void 0:e.value),m=[];for(const C of s)m.push(C*g%$);console.log(m);const u=null===(l=this.claveForm.get("mochilaFacil"))||void 0===l||null===(r=l.value)||void 0===r?void 0:r.split(",").map(C=>+C).reverse(),F=[];for(const C of m){let v=C,b=[];for(const h of u)console.log(v,"/",h,"=",Math.trunc(v/h)),b.push(Math.trunc(v/h)),1==Math.trunc(v/h)&&(v%=h);F.push(b.reverse())}console.log(F);const T=F.join().replace(/,/g,"").match(/.{1,6}/g);null===(a=this.descifradoForm.get("textoClaroOutputAscii"))||void 0===a||a.patchValue(T)}notificacionError(i){this.alertCtrl.create({header:"\xa1Error!",message:i,buttons:["Okay"]}).then(e=>{e.present()})}esPrimoRelativo(i,e){for(let l=2;l<i;l++)if(i%l==0&&e%l==0)return this.notificacionError(`${i} no es primo relativo de ${e}.`),!1;return!0}verificarVector(i,e){if(i.length===e)return[...i];{const l=e-i.length,r=[...i];for(let a=0;a<l;a++)r.unshift(0);return r}}}return c.\u0275fac=function(i){return new(i||c)(o.Y36(n.Br))},c.\u0275cmp=o.Xpm({type:c,selectors:[["app-cifrado"]],decls:77,vars:16,consts:[[1,"main-card"],[1,"ion-margin"],[3,"formGroup"],["formControlName","mochilaFacil","label","Mochila F\xe1cil","labelPlacement","floating","placeholder","Ingrese una lista de n\xfameros separados por comas"],[3,"disabled","click"],["formControlName","valorW","label","w","labelPlacement","floating","placeholder","Ingrese un n\xfamero","type","number"],["formControlName","valorT","label","t","labelPlacement","floating","placeholder","Ingrese un n\xfamero","type","number"],["formControlName","mochilaDificil","label","Mochila Dif\xedcil","labelPlacement","floating","readonly","true"],["formControlName","textoClaroInputAscii","label","Texto claro","labelPlacement","stacked","placeholder","Ingrese un texto claro","rows","1","autoGrow","true"],[1,"ion-margin",3,"disabled","click"],[1,"ion-no-margin","ion-no-padding"],["formControlName","textoClaroEnBits","label","Texto claro en bits","labelPlacement","floating","readonly","true","autoGrow","true","rows","1"],["formControlName","textoClaroEnBitsEnBloque","label","Bits organizados en bloques","labelPlacement","floating","readonly","true","autoGrow","true","rows","1"],["formControlName","textoCifradoOutputAscii","label","Resultado cifrado","labelPlacement","floating","readonly","true","autoGrow","true","rows","1"],["formControlName","textoCifradoInputAscii","label","Texto cifrado","labelPlacement","stacked","placeholder","Ingrese un texto cifrado","rows","1","autoGrow","true"],["formControlName","textoClaroOutputAscii","label","Resultado descifrado","labelPlacement","floating","readonly","true","autoGrow","true","rows","1"]],template:function(i,e){if(1&i&&(o.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),o._uU(3," Cifrado Merkle-Hellman (Mochila) para CAYD - C. Camilo Bernal "),o.qZA()()(),o.TgZ(4,"ion-content")(5,"ion-grid")(6,"ion-row")(7,"ion-col")(8,"ion-card",0)(9,"ion-card-header")(10,"ion-card-title"),o._uU(11," Cifrador / Descifrador Merkle-Hellman (Mochila) "),o.qZA()(),o.TgZ(12,"ion-card-content")(13,"ion-row",1)(14,"ion-col")(15,"form",2)(16,"ion-item"),o._UZ(17,"ion-input",3),o.TgZ(18,"ion-button",4),o.NdJ("click",function(){return e.verificarMochila()}),o._uU(19," Verificar Mochila "),o.qZA()()()()(),o.TgZ(20,"ion-row",1)(21,"ion-col")(22,"form",2)(23,"ion-item"),o._UZ(24,"ion-input",5),o.TgZ(25,"ion-button",4),o.NdJ("click",function(){return e.verificarW()}),o._uU(26," Verificar w "),o.qZA()()()()(),o.TgZ(27,"ion-row",1)(28,"ion-col")(29,"form",2)(30,"ion-item"),o._UZ(31,"ion-input",6),o.TgZ(32,"ion-button",4),o.NdJ("click",function(){return e.verificarT()}),o._uU(33," Verificar t "),o.qZA()()()()(),o.TgZ(34,"ion-row",1)(35,"ion-col")(36,"form",2)(37,"ion-item"),o._UZ(38,"ion-input",7),o.TgZ(39,"ion-button",4),o.NdJ("click",function(){return e.calcularMochilaDificil()}),o._uU(40," Calcular "),o.qZA()()()()(),o.TgZ(41,"ion-row",1)(42,"ion-col")(43,"form",2)(44,"ion-item"),o._UZ(45,"ion-textarea",8),o.qZA(),o.TgZ(46,"ion-button",9),o.NdJ("click",function(){return e.cifrar()}),o._uU(47," Cifrar "),o.qZA()()(),o.TgZ(48,"ion-col")(49,"ion-row",10)(50,"ion-col",10)(51,"form",2)(52,"ion-item"),o._UZ(53,"ion-textarea",11),o.qZA()()()(),o.TgZ(54,"ion-row",10)(55,"ion-col",10)(56,"form",2)(57,"ion-item"),o._UZ(58,"ion-textarea",12),o.qZA()()()(),o.TgZ(59,"ion-row",10)(60,"ion-col",10)(61,"form",2)(62,"ion-item"),o._UZ(63,"ion-textarea",13),o.qZA()()()()()(),o.TgZ(64,"ion-row",1)(65,"ion-col")(66,"form",2)(67,"ion-item"),o._UZ(68,"ion-textarea",14),o.qZA(),o.TgZ(69,"ion-button",9),o.NdJ("click",function(){return e.descifrar()}),o._uU(70," Descifrar "),o.qZA()()(),o.TgZ(71,"ion-col")(72,"ion-row",10)(73,"ion-col",10)(74,"form",2)(75,"ion-item"),o._UZ(76,"ion-textarea",15),o.qZA()()()()()()()()()()()()),2&i){let l,r,a,s;o.xp6(15),o.Q6J("formGroup",e.claveForm),o.xp6(3),o.Q6J("disabled",!(null!=(l=e.claveForm.get("mochilaFacil"))&&l.valid)),o.xp6(4),o.Q6J("formGroup",e.claveForm),o.xp6(3),o.Q6J("disabled",!(null!=(r=e.claveForm.get("valorW"))&&r.valid&&null!=(r=e.claveForm.get("mochilaFacil"))&&r.valid)),o.xp6(4),o.Q6J("formGroup",e.claveForm),o.xp6(3),o.Q6J("disabled",!(null!=(a=e.claveForm.get("valorT"))&&a.valid&&null!=(a=e.claveForm.get("valorW"))&&a.valid&&null!=(a=e.claveForm.get("mochilaFacil"))&&a.valid)),o.xp6(4),o.Q6J("formGroup",e.claveForm),o.xp6(3),o.Q6J("disabled",!(null!=(s=e.claveForm.get("valorT"))&&s.valid&&null!=(s=e.claveForm.get("valorW"))&&s.valid&&null!=(s=e.claveForm.get("mochilaFacil"))&&s.valid)),o.xp6(4),o.Q6J("formGroup",e.cifradoForm),o.xp6(3),o.Q6J("disabled",!e.cifradoForm.valid||!e.claveForm.valid),o.xp6(5),o.Q6J("formGroup",e.cifradoForm),o.xp6(5),o.Q6J("formGroup",e.cifradoForm),o.xp6(5),o.Q6J("formGroup",e.cifradoForm),o.xp6(5),o.Q6J("formGroup",e.descifradoForm),o.xp6(3),o.Q6J("disabled",!e.descifradoForm.valid||!e.claveForm.valid),o.xp6(5),o.Q6J("formGroup",e.descifradoForm)}},dependencies:[t._Y,t.JJ,t.JL,t.sg,t.u,n.YG,n.PM,n.FN,n.Zi,n.Dq,n.wI,n.W2,n.jY,n.Gu,n.pK,n.Ie,n.Nd,n.g2,n.wd,n.sr,n.as,n.j9],styles:[".main-card[_ngcontent-%COMP%]{margin:50px 10%;box-shadow:var(--main-card-box-shadow)}"]}),c})()}];let N=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=o.oAB({type:c}),c.\u0275inj=o.cJS({imports:[A.Bz.forChild(M),A.Bz]}),c})(),E=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=o.oAB({type:c}),c.\u0275inj=o.cJS({imports:[P.ez,t.u5,t.UX,n.Pc,N]}),c})()}}]);