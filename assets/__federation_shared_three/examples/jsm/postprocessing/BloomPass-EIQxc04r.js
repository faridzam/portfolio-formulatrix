import{importShared as c}from"../../../../__federation_fn_import-yTQldjZa.js";import{P as g,F as S}from"../../../../Pass-cog4uVtI.js";const{Vector2:x}=await c("three"),l={name:"ConvolutionShader",defines:{KERNEL_SIZE_FLOAT:"25.0",KERNEL_SIZE_INT:"25"},uniforms:{tDiffuse:{value:null},uImageIncrement:{value:new x(.001953125,0)},cKernel:{value:[]}},vertexShader:`

		uniform vec2 uImageIncrement;

		varying vec2 vUv;

		void main() {

			vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float cKernel[ KERNEL_SIZE_INT ];

		uniform sampler2D tDiffuse;
		uniform vec2 uImageIncrement;

		varying vec2 vUv;

		void main() {

			vec2 imageCoord = vUv;
			vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );

			for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {

				sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];
				imageCoord += uImageIncrement;

			}

			gl_FragColor = sum;

		}`,buildKernel:function(o){let t=2*Math.ceil(o*3)+1;t>25&&(t=25);const n=(t-1)*.5,i=new Array(t);let s=0;for(let r=0;r<t;++r)i[r]=I(r-n,o),s+=i[r];for(let r=0;r<t;++r)i[r]/=s;return i}};function I(o,e){return Math.exp(-(o*o)/(2*e*e))}const{AdditiveBlending:T,HalfFloatType:m,ShaderMaterial:f,UniformsUtils:v,Vector2:d,WebGLRenderTarget:h}=await c("three");class a extends g{constructor(e=1,t=25,n=4){super(),this.renderTargetX=new h(1,1,{type:m}),this.renderTargetX.texture.name="BloomPass.x",this.renderTargetY=new h(1,1,{type:m}),this.renderTargetY.texture.name="BloomPass.y",this.combineUniforms=v.clone(u.uniforms),this.combineUniforms.strength.value=e,this.materialCombine=new f({name:u.name,uniforms:this.combineUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:T,transparent:!0});const i=l;this.convolutionUniforms=v.clone(i.uniforms),this.convolutionUniforms.uImageIncrement.value=a.blurX,this.convolutionUniforms.cKernel.value=l.buildKernel(n),this.materialConvolution=new f({name:i.name,uniforms:this.convolutionUniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,defines:{KERNEL_SIZE_FLOAT:t.toFixed(1),KERNEL_SIZE_INT:t.toFixed(0)}}),this.needsSwap=!1,this.fsQuad=new S(null)}render(e,t,n,i,s){s&&e.state.buffers.stencil.setTest(!1),this.fsQuad.material=this.materialConvolution,this.convolutionUniforms.tDiffuse.value=n.texture,this.convolutionUniforms.uImageIncrement.value=a.blurX,e.setRenderTarget(this.renderTargetX),e.clear(),this.fsQuad.render(e),this.convolutionUniforms.tDiffuse.value=this.renderTargetX.texture,this.convolutionUniforms.uImageIncrement.value=a.blurY,e.setRenderTarget(this.renderTargetY),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCombine,this.combineUniforms.tDiffuse.value=this.renderTargetY.texture,s&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(n),this.clear&&e.clear(),this.fsQuad.render(e)}setSize(e,t){this.renderTargetX.setSize(e,t),this.renderTargetY.setSize(e,t)}dispose(){this.renderTargetX.dispose(),this.renderTargetY.dispose(),this.materialCombine.dispose(),this.materialConvolution.dispose(),this.fsQuad.dispose()}}const u={name:"CombineShader",uniforms:{tDiffuse:{value:null},strength:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float strength;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = strength * texel;

		}`};a.blurX=new d(.001953125,0);a.blurY=new d(0,.001953125);export{a as BloomPass};
