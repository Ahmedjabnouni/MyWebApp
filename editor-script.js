function _0x58aa(_0xe24d96,_0xf2798d){const _0x317fc1=_0x317f();return _0x58aa=function(_0x58aa30,_0xfd7d11){_0x58aa30=_0x58aa30-0x74;let _0x3cf285=_0x317fc1[_0x58aa30];return _0x3cf285;},_0x58aa(_0xe24d96,_0xf2798d);}const _0x44eef4=_0x58aa;(function(_0x449106,_0x4733fa){const _0xb5098c=_0x58aa,_0x3fdd61=_0x449106();while(!![]){try{const _0xc095ca=-parseInt(_0xb5098c(0x9c))/0x1*(parseInt(_0xb5098c(0x8c))/0x2)+parseInt(_0xb5098c(0xb1))/0x3*(parseInt(_0xb5098c(0x88))/0x4)+-parseInt(_0xb5098c(0xdc))/0x5*(-parseInt(_0xb5098c(0xb2))/0x6)+parseInt(_0xb5098c(0xc9))/0x7+parseInt(_0xb5098c(0xb9))/0x8*(-parseInt(_0xb5098c(0xb8))/0x9)+-parseInt(_0xb5098c(0xbe))/0xa*(parseInt(_0xb5098c(0xd9))/0xb)+-parseInt(_0xb5098c(0x87))/0xc*(-parseInt(_0xb5098c(0xae))/0xd);if(_0xc095ca===_0x4733fa)break;else _0x3fdd61['push'](_0x3fdd61['shift']());}catch(_0xdb5b8e){_0x3fdd61['push'](_0x3fdd61['shift']());}}}(_0x317f,0xa4694));let historyStack=[],currentIndex=-0x1,initialState,defaultColor=_0x44eef4(0x97),currentColor=defaultColor,lastInvocationTime=0x0;const debounceInterval=0x64;function updateHistory(){const _0x1c8f73=_0x44eef4,_0x31ab16=document[_0x1c8f73(0xc0)](_0x1c8f73(0xe7));currentIndex<historyStack[_0x1c8f73(0x84)]-0x1&&(historyStack=historyStack[_0x1c8f73(0x9e)](0x0,currentIndex+0x1)),historyStack[_0x1c8f73(0xba)](_0x31ab16['innerHTML']),currentIndex++,console[_0x1c8f73(0xe1)](_0x1c8f73(0x74),historyStack),console['log']('Current\x20index:',currentIndex);}function initSVGInteractions(_0x28a99d){const _0x30e7e=_0x44eef4,_0x427307=_0x28a99d[_0x30e7e(0xda)]('path,\x20rect,\x20circle,\x20ellipse,\x20polygon,\x20polyline');_0x427307['forEach'](_0x108b2b=>{const _0x440a42=_0x30e7e;_0x108b2b[_0x440a42(0xcb)](_0x440a42(0xbd),function(_0x28e524){startFillAnimation(_0x28e524,_0x108b2b,currentColor);});let _0x1cb176=_0x108b2b['style'][_0x440a42(0xe3)]||window[_0x440a42(0xb5)](_0x108b2b)[_0x440a42(0xa3)](_0x440a42(0xe3));_0x1cb176<0x1&&(_0x108b2b[_0x440a42(0x94)][_0x440a42(0x78)]=_0x440a42(0xa7));});}document[_0x44eef4(0xc0)]('svgFile')[_0x44eef4(0xcb)]('change',function(){const _0x41b48b=_0x44eef4,_0x10c5dd=this['files'][0x0];if(_0x10c5dd&&_0x10c5dd[_0x41b48b(0xdb)]===_0x41b48b(0x8e)){const _0x3d12db=new FileReader();_0x3d12db[_0x41b48b(0xce)]=function(_0x54dea3){const _0x315f40=_0x41b48b,_0x27c6e1=_0x54dea3[_0x315f40(0x86)][_0x315f40(0xe4)],_0xb72156=document[_0x315f40(0xc0)]('svgCanvas');_0xb72156[_0x315f40(0xee)]=_0x27c6e1,initialState=_0x27c6e1,initSVGInteractions(_0xb72156);},_0x3d12db[_0x41b48b(0xca)](_0x10c5dd);}else alert(_0x41b48b(0xd6));});function undo(){const _0x46de32=_0x44eef4;if(currentIndex>0x0)currentIndex--,document[_0x46de32(0xc0)](_0x46de32(0xe7))[_0x46de32(0xee)]=historyStack[currentIndex],initSVGInteractions(document['getElementById']('svgCanvas')),console[_0x46de32(0xe1)]('Undo\x20successful,\x20current\x20index:',currentIndex),currentIndex>0x0&&document[_0x46de32(0xc0)](_0x46de32(0xe7))['innerHTML']===''&&(currentIndex--,document[_0x46de32(0xc0)](_0x46de32(0xe7))[_0x46de32(0xee)]=historyStack[currentIndex],initSVGInteractions(document[_0x46de32(0xc0)](_0x46de32(0xe7))),console[_0x46de32(0xe1)](_0x46de32(0xc1),currentIndex));else currentIndex===0x0?resetSVG():alert(_0x46de32(0xa9));}function resetSVG(){const _0x367b6f=_0x44eef4;console[_0x367b6f(0xe1)]('Resetting\x20to\x20initial\x20state');const _0x18efc1=document[_0x367b6f(0xc0)]('svgCanvas');_0x18efc1[_0x367b6f(0xee)]=initialState,historyStack=[initialState],currentIndex=0x0,initSVGInteractions(_0x18efc1);}function addColor(_0x3c52b3){const _0x5893ef=_0x44eef4;!_0x3c52b3['startsWith']('#')&&(_0x3c52b3='#'+_0x3c52b3);if(!_0x3c52b3[_0x5893ef(0x90)](/^#[0-9A-Fa-f]{6}$/)){console[_0x5893ef(0xa6)](_0x5893ef(0xad),_0x3c52b3);return;}const _0x5b3636=Date[_0x5893ef(0xea)]();if(_0x5b3636-lastInvocationTime<debounceInterval)return;lastInvocationTime=_0x5b3636;const _0x550036=document[_0x5893ef(0xc0)](_0x5893ef(0xaf)),_0x4d5ff9=document[_0x5893ef(0xdd)](_0x5893ef(0x95));_0x4d5ff9['className']=_0x5893ef(0xb6),_0x4d5ff9['style'][_0x5893ef(0xc7)]=_0x3c52b3,_0x4d5ff9['onclick']=function(){const _0x597721=_0x5893ef;document['querySelectorAll']('.color-swatch')['forEach'](_0x40a8fc=>{const _0x4c99a4=_0x58aa;_0x40a8fc[_0x4c99a4(0x94)][_0x4c99a4(0xb7)]=_0x4c99a4(0xa7);}),this[_0x597721(0x94)][_0x597721(0xb7)]=_0x597721(0xe0),currentColor=_0x3c52b3;};const _0x59c986=document[_0x5893ef(0xc0)]('palette-placeholder');_0x59c986&&(_0x59c986[_0x5893ef(0x94)][_0x5893ef(0x77)]=_0x5893ef(0xa7)),_0x550036[_0x5893ef(0xb4)](_0x4d5ff9),console[_0x5893ef(0xe1)]('Color\x20added:',_0x3c52b3),updateHistory(),document[_0x5893ef(0xc0)]('hexColorInput')[_0x5893ef(0x76)]='';}document[_0x44eef4(0xc0)](_0x44eef4(0xc5))[_0x44eef4(0xcb)](_0x44eef4(0xef),function(){const _0x996970=_0x44eef4,_0x414a8d=this['value'];console[_0x996970(0xe1)](_0x996970(0x8b),_0x414a8d),currentColor=_0x414a8d,addColor(_0x414a8d);}),document['querySelector'](_0x44eef4(0x9b))['addEventListener']('click',function(){const _0x5d4cb4=_0x44eef4,_0x1cc357=document[_0x5d4cb4(0xc0)]('hexColorInput')[_0x5d4cb4(0x76)]['trim']();if(_0x1cc357[_0x5d4cb4(0x90)](/^(#)?[0-9A-Fa-f]{6}$/))addColor(_0x1cc357);else{const _0x561e9c=document[_0x5d4cb4(0xc0)](_0x5d4cb4(0xc5))['value'];addColor(_0x561e9c);}}),document['getElementById'](_0x44eef4(0x80))['addEventListener'](_0x44eef4(0xef),function(_0x39320a){const _0x221bd9=_0x44eef4,_0xf119e1=_0x39320a[_0x221bd9(0x86)][_0x221bd9(0x8a)][0x0],_0x583a56=new FileReader();_0x583a56['onload']=function(_0x2873a5){const _0x3d0e69=_0x221bd9,_0x1a0638=document['getElementById'](_0x3d0e69(0xd2));_0x1a0638['src']=_0x2873a5['target'][_0x3d0e69(0xe4)],_0x1a0638[_0x3d0e69(0xce)]=function(){extractColors();},_0x1a0638[_0x3d0e69(0x94)][_0x3d0e69(0x77)]=_0x3d0e69(0xf1);},_0x583a56[_0x221bd9(0xd7)](_0xf119e1);});function extractColors(){const _0x4ddeec=_0x44eef4,_0x222e0a=document[_0x4ddeec(0xc0)](_0x4ddeec(0xd2)),_0x3ebb6a=new ColorThief(),_0x5c9672=_0x3ebb6a[_0x4ddeec(0xcd)](_0x222e0a,0x8),_0x2227eb=document[_0x4ddeec(0xc0)](_0x4ddeec(0xaf));_0x2227eb[_0x4ddeec(0xee)]='',_0x5c9672[_0x4ddeec(0x7e)](_0x36e458=>{const _0x1832f5=_0x4ddeec,_0x50a746=_0x1832f5(0xa1)+_0x36e458[0x0]+',\x20'+_0x36e458[0x1]+',\x20'+_0x36e458[0x2]+')',_0x362cb8=document[_0x1832f5(0xdd)](_0x1832f5(0x95));_0x362cb8[_0x1832f5(0xbc)]=_0x1832f5(0xb6),_0x362cb8['style'][_0x1832f5(0xc7)]=_0x50a746,_0x362cb8[_0x1832f5(0x8f)]=function(){const _0x85c3b4=_0x1832f5;document[_0x85c3b4(0xda)]('.color-swatch')['forEach'](_0x1f5464=>{const _0x51a5c2=_0x85c3b4;_0x1f5464['style'][_0x51a5c2(0xb7)]='none';}),this[_0x85c3b4(0x94)][_0x85c3b4(0xb7)]=_0x85c3b4(0xe0),currentColor=_0x50a746;},_0x2227eb['appendChild'](_0x362cb8);});}function startFillAnimation(_0x732202,_0x19d105,_0x4a7395){const _0x39cf27=_0x44eef4,_0x1fdaa8=_0x19d105[_0x39cf27(0x82)](),_0x46a1b2=_0x19d105[_0x39cf27(0xa2)],_0x4db67a=_0x46a1b2['createSVGPoint']();_0x4db67a['x']=_0x732202['clientX'],_0x4db67a['y']=_0x732202[_0x39cf27(0xeb)];const _0x14305e=_0x4db67a[_0x39cf27(0xa4)](_0x46a1b2['getScreenCTM']()[_0x39cf27(0xd5)]()),_0x4f8059=_0x39cf27(0xd8)+_0x19d105[_0x39cf27(0xbf)]+'-'+Math['random']()[_0x39cf27(0x7b)](0x24)['substr'](0x2,0x9);let _0x4d446d=document[_0x39cf27(0xe6)](_0x39cf27(0xc2),_0x39cf27(0x98));_0x4d446d[_0x39cf27(0xac)]('id',_0x4f8059);const _0x56200e=document[_0x39cf27(0xe6)]('http://www.w3.org/2000/svg',_0x39cf27(0x7a));_0x56200e['setAttribute']('cx',_0x14305e['x']),_0x56200e[_0x39cf27(0xac)]('cy',_0x14305e['y']),_0x56200e['setAttribute']('r',0x0),_0x4d446d['appendChild'](_0x56200e),_0x19d105[_0x39cf27(0xa2)][_0x39cf27(0xb4)](_0x4d446d),_0x19d105[_0x39cf27(0x94)][_0x39cf27(0x98)]=_0x39cf27(0xd3)+_0x4f8059+')',_0x19d105[_0x39cf27(0x94)][_0x39cf27(0x79)]=_0x4a7395;const _0x5d9a75=Math[_0x39cf27(0xc4)](_0x1fdaa8['width']**0x2+_0x1fdaa8[_0x39cf27(0xab)]**0x2);animateCircle(_0x56200e,_0x14305e['x'],_0x14305e['y'],_0x5d9a75,()=>{const _0x41e5df=_0x39cf27;_0x19d105[_0x41e5df(0x94)][_0x41e5df(0x98)]='',_0x19d105['removeAttribute'](_0x41e5df(0xd1)),updateHistory();}),console[_0x39cf27(0xe1)](_0x39cf27(0x99),_0x19d105);}function animateCircle(_0x50de4f,_0x2ac847,_0x1d30b8,_0x24db0e,_0x132ae8){let _0x4ccced=0x0;const _0xb3fdaf=setInterval(()=>{const _0x1133f8=_0x58aa;_0x4ccced+=0x3,_0x50de4f[_0x1133f8(0xac)]('cx',_0x2ac847),_0x50de4f['setAttribute']('cy',_0x1d30b8),_0x50de4f[_0x1133f8(0xac)]('r',_0x4ccced),_0x4ccced>=_0x24db0e&&(clearInterval(_0xb3fdaf),_0x50de4f[_0x1133f8(0xbb)]&&_0x50de4f[_0x1133f8(0xbb)][_0x1133f8(0xcf)](_0x50de4f),typeof _0x132ae8===_0x1133f8(0xb0)&&_0x132ae8(),console[_0x1133f8(0xe1)](_0x1133f8(0xc8),_0x50de4f));},0xa);}function startDissolveAnimation(_0x306bc2,_0x4b4ab2){const _0x991ea6=_0x44eef4;_0x306bc2[_0x991ea6(0x94)][_0x991ea6(0x85)]=_0x991ea6(0xe8),_0x306bc2['style'][_0x991ea6(0x79)]=_0x4b4ab2,updateHistory();}function _0x317f(){const _0x208bf8=['image/png','style','div','getContext','#ff0000','clipPath','Starting\x20fill\x20animation\x20for\x20element:','message','.color-picker\x20button','3MozvVy','downloadSvgButton','slice','width','Column:','rgb(','ownerSVGElement','getPropertyValue','matrixTransform','download','error','none','body','No\x20more\x20actions\x20to\x20undo!','viewBox','height','setAttribute','Invalid\x20or\x20empty\x20hex\x20code:','5551otAIfD','palette','function','524289oxvfFK','453408qnsLsN','At:','appendChild','getComputedStyle','color-swatch','border','2797974bPlKFm','8eFKhQd','push','parentNode','className','click','10HDxMBb','tagName','getElementById','Undo\x20successful\x20on\x20second\x20attempt,\x20current\x20index:','http://www.w3.org/2000/svg','keydown','sqrt','colorPicker','SVG\x20dimensions\x20and\x20properties\x20adjusted.','backgroundColor','Animation\x20completed\x20for:','4308556peIdOo','readAsText','addEventListener','ctrlKey','getPalette','onload','removeChild','key','clip-path','uploadedImage','url(#','Line:','inverse','Please\x20upload\x20a\x20valid\x20SVG\x20file.','readAsDataURL','clipPath-','11928873LcSxXV','querySelectorAll','type','5njfMNQ','createElement','xMidYMid\x20meet','getItem','1px\x20solid\x20black','log','edited-image.png','opacity','result','600','createElementNS','svgCanvas','fill\x201s\x20ease','currentSVG','now','clientY','DOMContentLoaded','createObjectURL','innerHTML','change','href','block','0\x200\x20500\x20500','History\x20updated:','toDataURL','value','display','pointerEvents','fill','circle','toString','downloadPngButton','800','forEach','data:image/svg+xml;charset=utf-8,','imageFile','serializeToString','getBBox','filename','length','transition','target','21372LAeXPJ','28FlZOfu','edited-svg.svg','files','Color\x20picker\x20changed\x20to:\x20','404098hXhofl','revokeObjectURL','image/svg+xml','onclick','match','preserveAspectRatio','lineno'];_0x317f=function(){return _0x208bf8;};return _0x317f();}function adjustSVGSize(){const _0xaa2ada=_0x44eef4,_0x341b1f=document[_0xaa2ada(0xc0)]('svgCanvas');if(!_0x341b1f){console[_0xaa2ada(0xa6)]('SVG\x20element\x20not\x20found');return;}_0x341b1f[_0xaa2ada(0xac)](_0xaa2ada(0xaa),_0xaa2ada(0xf2)),_0x341b1f[_0xaa2ada(0xac)](_0xaa2ada(0x91),_0xaa2ada(0xde)),_0x341b1f[_0xaa2ada(0xac)](_0xaa2ada(0x9f),_0xaa2ada(0x7d)),_0x341b1f[_0xaa2ada(0xac)](_0xaa2ada(0xab),_0xaa2ada(0xe5)),console[_0xaa2ada(0xe1)](_0xaa2ada(0xc6));}adjustSVGSize();function downloadSVG(){const _0x10bbf2=_0x44eef4,_0x37d82b=document[_0x10bbf2(0xc0)]('svgCanvas');if(_0x37d82b){const _0x27cc92=_0x37d82b['innerHTML'],_0x3776e0=new Blob([_0x27cc92],{'type':'image/svg+xml'}),_0x8db7ec=URL[_0x10bbf2(0xed)](_0x3776e0),_0x17463d=document['createElement']('a');_0x17463d[_0x10bbf2(0xf0)]=_0x8db7ec,_0x17463d[_0x10bbf2(0xa5)]=_0x10bbf2(0x89),document['body']['appendChild'](_0x17463d),_0x17463d[_0x10bbf2(0xbd)](),document[_0x10bbf2(0xa8)]['removeChild'](_0x17463d),URL[_0x10bbf2(0x8d)](_0x8db7ec);}}function downloadSVGAsPNG(){const _0x1794c7=_0x44eef4,_0x12907e=document['getElementById'](_0x1794c7(0xe7)),_0x509db7=new XMLSerializer()[_0x1794c7(0x81)](_0x12907e),_0x59aafb=_0x1794c7(0x7f)+encodeURIComponent(_0x509db7),_0x3047b8=new Image();_0x3047b8[_0x1794c7(0xce)]=function(){const _0x535722=_0x1794c7,_0x4a0d0e=document[_0x535722(0xdd)]('canvas');_0x4a0d0e[_0x535722(0x9f)]=_0x3047b8[_0x535722(0x9f)],_0x4a0d0e[_0x535722(0xab)]=_0x3047b8[_0x535722(0xab)];const _0x34d126=_0x4a0d0e[_0x535722(0x96)]('2d');_0x34d126['drawImage'](_0x3047b8,0x0,0x0);const _0x39ec08=_0x4a0d0e[_0x535722(0x75)](_0x535722(0x93)),_0x2d3761=document[_0x535722(0xdd)]('a');_0x2d3761[_0x535722(0xf0)]=_0x39ec08,_0x2d3761['download']=_0x535722(0xe2),document[_0x535722(0xa8)][_0x535722(0xb4)](_0x2d3761),_0x2d3761[_0x535722(0xbd)](),document[_0x535722(0xa8)]['removeChild'](_0x2d3761);},_0x3047b8['src']=_0x59aafb;}document[_0x44eef4(0xcb)](_0x44eef4(0xec),function(){const _0x584dd8=_0x44eef4,_0xa5a60d=document['getElementById'](_0x584dd8(0x9d));_0xa5a60d&&_0xa5a60d['addEventListener']('click',function(){downloadSVG();});}),document[_0x44eef4(0xcb)]('DOMContentLoaded',function(){const _0x4c8c81=_0x44eef4,_0x49cfc8=document[_0x4c8c81(0xc0)](_0x4c8c81(0x7c));_0x49cfc8&&_0x49cfc8[_0x4c8c81(0xcb)](_0x4c8c81(0xbd),function(){downloadSVGAsPNG();});}),document[_0x44eef4(0xcb)](_0x44eef4(0xc3),function(_0x4f0cb2){const _0x35fb3f=_0x44eef4;_0x4f0cb2[_0x35fb3f(0xcc)]&&_0x4f0cb2[_0x35fb3f(0xd0)]==='z'&&undo();}),document[_0x44eef4(0xcb)](_0x44eef4(0xec),function(){const _0x4d66a9=_0x44eef4,_0x29269b=document['getElementById'](_0x4d66a9(0xe7)),_0x3002ec=localStorage[_0x4d66a9(0xdf)](_0x4d66a9(0xe9));_0x3002ec&&(_0x29269b[_0x4d66a9(0xee)]=_0x3002ec,initSVGInteractions(_0x29269b)),adjustSVGSize();}),window[_0x44eef4(0xcb)](_0x44eef4(0xa6),function(_0x4bba72){const _0x5d4e7f=_0x44eef4;console[_0x5d4e7f(0xa6)]('Error\x20occurred:',_0x4bba72[_0x5d4e7f(0x9a)]),console[_0x5d4e7f(0xa6)](_0x5d4e7f(0xb3),_0x4bba72[_0x5d4e7f(0x83)],_0x5d4e7f(0xd4),_0x4bba72[_0x5d4e7f(0x92)],_0x5d4e7f(0xa0),_0x4bba72['colno']);});
