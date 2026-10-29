import { useId, type SVGProps } from 'react';
import { cx, type KazTone } from '../../utils';

export interface KazSparklineProps extends Omit<SVGProps<SVGSVGElement>, 'values'> {
  data: number[];
  /** Cor da linha. */
  tone?: KazTone;
  /** Preenche a área sob a linha com degradê. */
  area?: boolean;
  /** Curva suave (padrão) ou linhas retas. */
  smooth?: boolean;
  strokeWidth?: number;
  height?: number;
  /** Descrição do gráfico para leitores de tela, ex.: "Atendimentos subiram 12% na semana". */
  label: string;
}

/** Converte pontos em caminho suave (Catmull-Rom para Bézier). */
function buildPath(points: [number, number][], smooth: boolean) {
  if (points.length === 0) return '';
  if (!smooth || points.length < 3) return points.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function KazSparkline({ data, tone = 'primary', area, smooth = true, strokeWidth = 2, height = 48, label, className, ...rest }: KazSparklineProps) {
  const gradientId = useId();
  const width = 200;
  const pad = strokeWidth;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const points: [number, number][] = data.map((value, i) => [
    data.length === 1 ? width / 2 : (i / (data.length - 1)) * width,
    pad + (1 - (value - min) / span) * (height - pad * 2),
  ]);
  const line = buildPath(points, smooth);
  const fill = points.length ? `${line} L${width},${height} L0,${height} Z` : '';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      className={cx('kaz-sparkline', `kaz-tone-${tone}`, className)}
      style={{ height }}
      {...rest}
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fill} fill={`url(#${gradientId})`} stroke="none" />
        </>
      )}
      <path d={line} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
