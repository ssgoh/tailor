import React from 'react';
import { StyleConfig, FabricItem, GarmentType } from '../types/tailor';

interface GarmentPreviewSvgProps {
  styleConfig: StyleConfig;
  fabric: FabricItem;
  garmentType: GarmentType;
  className?: string;
}

export const GarmentPreviewSvg: React.FC<GarmentPreviewSvgProps> = ({
  styleConfig,
  fabric,
  garmentType,
  className = 'w-full h-auto max-h-[420px]'
}) => {
  const isDoubleBreasted = styleConfig.buttons.includes('Double-Breasted');
  const isShawl = styleConfig.lapel === 'Shawl Collar';
  const isPeak = styleConfig.lapel === 'Peak Lapel';
  const isNeapolitan = styleConfig.lapel === 'Neapolitan Wide Notch';
  const hasTicketPocket = styleConfig.pockets.includes('Ticket');
  const isPatchPockets = styleConfig.pockets === 'Patch Pockets';

  // Base colors
  const primaryColor = fabric.hexColor || '#1A2338';
  const isLightCloth = primaryColor.toLowerCase() === '#e6dcc8' || primaryColor.toLowerCase() === '#7ca0c7';
  const strokeLine = isLightCloth ? '#524536' : '#EAE6DF';
  const shadowColor = isLightCloth ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.35)';
  const highlightColor = isLightCloth ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)';
  const lapelFacingColor = isShawl && garmentType === 'Bespoke Tuxedo' 
    ? '#0A0A0A' // Grosgrain / Satin black facing for Tuxedo
    : primaryColor;

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 ${className}`}>
      <svg
        viewBox="0 0 400 480"
        className="w-full h-full max-h-[380px] drop-shadow-md select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle woven texture pattern overlay */}
          <pattern id="woolTexture" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <line x1="4" y1="0" x2="0" y2="4" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
          </pattern>

          {/* Shading gradient for bespoke torso roll */}
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.88" />
            <stop offset="25%" stopColor={primaryColor} />
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="75%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.88" />
          </linearGradient>

          <linearGradient id="sleeveGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={primaryColor} />
          </linearGradient>

          <linearGradient id="sleeveGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Tailor's Collar & Shirt Neckband Base */}
        <path d="M 172 45 L 200 65 L 228 45 L 200 35 Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
        <path d="M 194 62 L 206 62 L 204 110 L 196 110 Z" fill="#2E3A4B" opacity="0.9" />

        {/* Back neck collar facing */}
        <path d="M 166 48 Q 200 58 234 48 L 228 72 Q 200 78 172 72 Z" fill={primaryColor} opacity="0.9" />

        {/* Left Sleeve */}
        <path
          d="M 112 85 C 98 120 78 200 74 315 C 80 325 110 320 115 310 C 118 220 126 150 134 118 Z"
          fill="url(#sleeveGradLeft)"
          stroke={strokeLine}
          strokeWidth="1.2"
        />
        {/* Left Sleeve texture */}
        <path
          d="M 112 85 C 98 120 78 200 74 315 C 80 325 110 320 115 310 C 118 220 126 150 134 118 Z"
          fill="url(#woolTexture)"
        />
        {/* Left sleeve cuff seam & horn buttons */}
        <line x1="77" y1="298" x2="114" y2="294" stroke={strokeLine} strokeWidth="0.8" strokeDasharray="2,2" />
        <circle cx="82" cy="288" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="84" cy="281" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="86" cy="274" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="88" cy="267" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />

        {/* Right Sleeve */}
        <path
          d="M 288 85 C 302 120 322 200 326 315 C 320 325 290 320 285 310 C 282 220 274 150 266 118 Z"
          fill="url(#sleeveGradRight)"
          stroke={strokeLine}
          strokeWidth="1.2"
        />
        <path
          d="M 288 85 C 302 120 322 200 326 315 C 320 325 290 320 285 310 C 282 220 274 150 266 118 Z"
          fill="url(#woolTexture)"
        />
        {/* Right sleeve cuff seam & buttons */}
        <line x1="323" y1="298" x2="286" y2="294" stroke={strokeLine} strokeWidth="0.8" strokeDasharray="2,2" />
        <circle cx="318" cy="288" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="316" cy="281" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="314" cy="274" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />
        <circle cx="312" cy="267" r="2.2" fill="#221C16" stroke="#C5A059" strokeWidth="0.5" />

        {/* Main Body Jacket Torso */}
        <path
          d="M 112 85 
             L 166 48 
             L 234 48 
             L 288 85 
             C 272 130 268 180 270 240 
             C 272 270 282 320 284 350 
             C 284 354 278 358 265 358 
             L 200 360 
             L 135 358 
             C 122 358 116 354 116 350 
             C 118 320 128 270 130 240 
             C 132 180 128 130 112 85 Z"
          fill="url(#bodyGrad)"
          stroke={strokeLine}
          strokeWidth="1.4"
        />
        {/* Body Texture overlay */}
        <path
          d="M 112 85 L 166 48 L 234 48 L 288 85 C 272 130 268 180 270 240 C 272 270 282 320 284 350 C 284 354 278 358 265 358 L 200 360 L 135 358 C 122 358 116 354 116 350 C 118 320 128 270 130 240 C 132 180 128 130 112 85 Z"
          fill="url(#woolTexture)"
        />

        {/* Subtle Waist Suppression Shading */}
        <path d="M 130 220 Q 140 245 132 275" stroke={shadowColor} strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M 270 220 Q 260 245 268 275" stroke={shadowColor} strokeWidth="3" fill="none" opacity="0.6" />

        {/* Center front seam or double breasted wrap */}
        {isDoubleBreasted ? (
          <>
            {/* Double breasted overlap fold line */}
            <path d="M 228 190 L 226 358" stroke={strokeLine} strokeWidth="1.2" />
            <path d="M 174 200 L 176 358" stroke={shadowColor} strokeWidth="1.5" strokeDasharray="3,3" />
          </>
        ) : (
          /* Single Breasted center front seam */
          <path d="M 200 215 L 200 360" stroke={strokeLine} strokeWidth="1.2" />
        )}

        {/* Left Lapel */}
        {isShawl ? (
          <path
            d="M 166 48 C 158 90 148 160 200 230 L 195 235 C 142 165 145 90 166 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        ) : isPeak ? (
          <path
            d="M 166 48 L 150 115 L 128 92 L 142 155 L 200 225 L 192 230 L 135 152 L 115 110 L 144 115 L 166 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        ) : isNeapolitan ? (
          /* Wide Neapolitan Notch */
          <path
            d="M 166 48 L 148 112 L 136 106 L 138 126 L 145 142 L 200 228 L 194 232 L 138 140 L 128 122 L 142 110 L 166 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        ) : (
          /* Standard Savile Row Notch Lapel */
          <path
            d="M 166 48 L 152 118 L 138 112 L 140 130 L 148 150 L 200 225 L 194 229 L 142 148 L 130 128 L 146 116 L 166 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        )}

        {/* Right Lapel */}
        {isShawl ? (
          <path
            d="M 234 48 C 242 90 252 160 200 230 L 205 235 C 258 165 255 90 234 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        ) : isPeak ? (
          <path
            d="M 234 48 L 250 115 L 272 92 L 258 155 L 200 225 L 208 230 L 265 152 L 285 110 L 256 115 L 234 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        ) : isNeapolitan ? (
          <path
            d="M 234 48 L 252 112 L 264 106 L 262 126 L 255 142 L 200 228 L 206 232 L 262 140 L 272 122 L 258 110 L 234 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        ) : (
          <path
            d="M 234 48 L 248 118 L 262 112 L 260 130 L 252 150 L 200 225 L 206 229 L 258 148 L 270 128 L 254 116 L 234 48 Z"
            fill={lapelFacingColor}
            stroke={strokeLine}
            strokeWidth="1.3"
          />
        )}

        {/* Left Lapel Milanese Buttonhole */}
        <line x1="146" y1="128" x2="154" y2="134" stroke="#B8860B" strokeWidth="1.6" />

        {/* Left Breast Pocket (Barchetta pocket) */}
        <path
          d="M 148 160 Q 165 163 178 160 L 178 174 Q 165 177 148 174 Z"
          fill={primaryColor}
          stroke={strokeLine}
          strokeWidth="1"
        />
        {/* Crisp white silk pocket square peeking out */}
        <path d="M 154 160 L 163 151 L 172 160 Z" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="0.6" />

        {/* Lower Pockets */}
        {isPatchPockets ? (
          <>
            {/* Left Patch Pocket */}
            <path
              d="M 132 270 Q 134 320 162 322 Q 185 320 186 270 Z"
              fill={primaryColor}
              stroke={strokeLine}
              strokeWidth="1.2"
            />
            {/* Right Patch Pocket */}
            <path
              d="M 214 270 Q 215 320 238 322 Q 266 320 268 270 Z"
              fill={primaryColor}
              stroke={strokeLine}
              strokeWidth="1.2"
            />
          </>
        ) : (
          <>
            {/* Left Flap / Jetted Pocket */}
            <g>
              <rect x="134" y="272" width="48" height="15" rx="1" fill={primaryColor} stroke={strokeLine} strokeWidth="1" />
              <line x1="134" y1="272" x2="182" y2="272" stroke={strokeLine} strokeWidth="1.2" />
            </g>

            {/* Ticket Pocket (if selected) */}
            {hasTicketPocket && (
              <g>
                <rect x="224" y="246" width="34" height="11" rx="1" fill={primaryColor} stroke={strokeLine} strokeWidth="0.9" />
                <line x1="224" y1="246" x2="258" y2="246" stroke={strokeLine} strokeWidth="1.1" />
              </g>
            )}

            {/* Right Flap / Jetted Pocket */}
            <g>
              <rect x="218" y="272" width="48" height="15" rx="1" fill={primaryColor} stroke={strokeLine} strokeWidth="1" />
              <line x1="218" y1="272" x2="266" y2="272" stroke={strokeLine} strokeWidth="1.2" />
            </g>
          </>
        )}

        {/* Buttons on front closure */}
        {isDoubleBreasted ? (
          /* Double Breasted 6x2 layout */
          <g>
            {/* Top row */}
            <circle cx="178" cy="208" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <circle cx="222" cy="208" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            {/* Fastening middle row */}
            <circle cx="178" cy="242" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <circle cx="222" cy="242" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            {/* Anchor bottom row */}
            <circle cx="178" cy="276" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <circle cx="222" cy="276" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
          </g>
        ) : styleConfig.buttons === 'Single-Breasted 1-Button' ? (
          <g>
            <circle cx="200" cy="240" r="4.4" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <line x1="192" y1="240" x2="198" y2="240" stroke="#B8860B" strokeWidth="1.2" />
          </g>
        ) : styleConfig.buttons === 'Single-Breasted 3-Roll-2' ? (
          <g>
            <circle cx="200" cy="225" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" opacity="0.6" />
            <circle cx="200" cy="254" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <circle cx="200" cy="284" r="4.2" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
          </g>
        ) : (
          /* Default Single Breasted 2-Button */
          <g>
            <circle cx="200" cy="238" r="4.4" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <line x1="192" y1="238" x2="198" y2="238" stroke="#B8860B" strokeWidth="1.2" />
            <circle cx="200" cy="274" r="4.4" fill="#221C16" stroke="#D1B280" strokeWidth="0.8" />
            <line x1="192" y1="274" x2="198" y2="274" stroke="#B8860B" strokeWidth="1.2" />
          </g>
        )}

        {/* Monogram indicator if personalized */}
        {styleConfig.monogramText && (
          <g opacity="0.9">
            <rect x="220" y="174" width="28" height="12" rx="2" fill="rgba(0,0,0,0.3)" />
            <text
              x="234"
              y="183"
              fill={styleConfig.monogramColor === 'Burnished Gold Silk' ? '#E5C07B' : '#EAE6DF'}
              fontSize="7"
              fontWeight="bold"
              fontFamily="serif"
              textAnchor="middle"
            >
              {styleConfig.monogramText}
            </text>
          </g>
        )}

        {/* Soft jacket hem contour */}
        <path d="M 135 358 Q 200 366 265 358" stroke={highlightColor} strokeWidth="1" fill="none" />
      </svg>

      {/* Sartorial Blueprint Caption */}
      <div className="w-full mt-2 pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: primaryColor }} />
          <span>{fabric.name.split(' ')[0]} {fabric.colorName}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-stone-600 font-mono">
          <span>{styleConfig.lapel}</span>
          <span>·</span>
          <span>{styleConfig.buttons.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
};
