import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import { KazIcon } from '../KazIcon/KazIcon';

export interface KazCarouselSlide {
  id: string;
  content: ReactNode;
  /** Título e texto sobrepostos ao slide. */
  caption?: { title: ReactNode; description?: ReactNode };
  /** Nome do slide para leitores de tela. */
  label?: string;
}

export interface KazCarouselProps extends HTMLAttributes<HTMLElement> {
  slides: KazCarouselSlide[];
  /** Nome do carrossel para leitores de tela. */
  label: string;
  /** Setas dentro do slide, fora dele, ou escondidas. */
  arrows?: 'inside' | 'outside' | 'none';
  /** Indicadores dentro do slide, abaixo dele, ou escondidos. */
  indicators?: 'inside' | 'outside' | 'none';
  /**
   * Troca automática em ms. Desligado por padrão: movimento inesperado atrapalha
   * a leitura e pode incomodar pessoas sensíveis a estímulos.
   */
  autoPlay?: number;
  loop?: boolean;
  /** Proporção do slide, ex.: "16 / 9". */
  aspectRatio?: string;
}

export function KazCarousel({ slides, label, arrows = 'inside', indicators = 'inside', autoPlay, loop = true, aspectRatio = '16 / 9', className, ...rest }: KazCarouselProps) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);
  const count = slides.length;

  useEffect(() => {
    reducedMotion.current = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const go = (next: number) => {
    if (loop) setIndex((next + count) % count);
    else setIndex(Math.max(0, Math.min(count - 1, next)));
  };

  useEffect(() => {
    if (!autoPlay || paused || reducedMotion.current || count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), autoPlay);
    return () => clearInterval(timer);
  }, [autoPlay, paused, count]);

  const prevDisabled = !loop && index === 0;
  const nextDisabled = !loop && index === count - 1;

  const arrowButtons = (
    <>
      <button type="button" className={cx('kaz-carousel__arrow', 'kaz-carousel__arrow--prev')} aria-controls={`${id}-track`} aria-label="Slide anterior" disabled={prevDisabled} onClick={() => go(index - 1)}>
        <KazIcon name="chevron-left" />
      </button>
      <button type="button" className={cx('kaz-carousel__arrow', 'kaz-carousel__arrow--next')} aria-controls={`${id}-track`} aria-label="Próximo slide" disabled={nextDisabled} onClick={() => go(index + 1)}>
        <KazIcon name="chevron-right" />
      </button>
    </>
  );

  const dots = (
    <div className="kaz-carousel__dots" role="group" aria-label="Escolher slide">
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          className={cx('kaz-carousel__dot', i === index && 'kaz-carousel__dot--active')}
          aria-label={`Ir para o slide ${i + 1}`}
          aria-current={i === index || undefined}
          onClick={() => go(i)}
        />
      ))}
    </div>
  );

  return (
    <section
      aria-roledescription="carrossel"
      aria-label={label}
      className={cx('kaz-carousel', `kaz-carousel--arrows-${arrows}`, `kaz-carousel--dots-${indicators}`, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(index - 1);
        if (event.key === 'ArrowRight') go(index + 1);
      }}
      {...rest}
    >
      <div className="kaz-carousel__frame">
        {arrows === 'outside' && arrowButtons}
        <div className="kaz-carousel__viewport" style={{ aspectRatio }}>
          <div id={`${id}-track`} className="kaz-carousel__track" aria-live={autoPlay && !paused ? 'off' : 'polite'} style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={slide.label ?? `${i + 1} de ${count}`}
                aria-hidden={i !== index}
                className="kaz-carousel__slide"
                {...(i !== index ? { inert: '' } : {})}
              >
                {slide.content}
                {slide.caption && (
                  <div className="kaz-carousel__caption">
                    <p className="kaz-carousel__caption-title">{slide.caption.title}</p>
                    {slide.caption.description && <p className="kaz-carousel__caption-desc">{slide.caption.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          {arrows === 'inside' && arrowButtons}
          {indicators === 'inside' && dots}
        </div>
      </div>
      {indicators === 'outside' && dots}
    </section>
  );
}
