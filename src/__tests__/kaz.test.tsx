import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as Kaz from '../index';
import { getPageRange } from '../components/KazPagination/KazPagination';
import { getInitials } from '../components/KazAvatar/KazAvatar';

afterEach(cleanup);

describe('exportações', () => {
  it('todo componente público usa o prefixo Kaz', () => {
    const components = Object.keys(Kaz).filter((name) => /^[A-Z]/.test(name));
    expect(components.length).toBeGreaterThan(25);
    for (const name of components) expect(name.startsWith('Kaz')).toBe(true);
  });
});

describe('KazButton', () => {
  it('renderiza botão e dispara clique', () => {
    const onClick = vi.fn();
    render(<Kaz.KazButton onClick={onClick}>Salvar</Kaz.KazButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('bloqueia clique durante loading', () => {
    const onClick = vi.fn();
    render(<Kaz.KazButton loading onClick={onClick}>Salvar</Kaz.KazButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveProperty('disabled', true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('vira link com href', () => {
    render(<Kaz.KazButton href="/contato">Contato</Kaz.KazButton>);
    expect(screen.getByRole('link', { name: 'Contato' }).getAttribute('href')).toBe('/contato');
  });
});

describe('KazInput', () => {
  it('liga rótulo e mensagem de erro', () => {
    render(<Kaz.KazInput label="E-mail" error="Inválido" />);
    const input = screen.getByLabelText('E-mail');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    const describedBy = input.getAttribute('aria-describedby')!;
    expect(document.getElementById(describedBy)?.textContent).toBe('Inválido');
  });
});

describe('KazAccordion', () => {
  it('abre um item por vez no modo single', () => {
    render(
      <Kaz.KazAccordion
        items={[
          { id: 'a', title: 'A', content: 'Conteúdo A' },
          { id: 'b', title: 'B', content: 'Conteúdo B' },
        ]}
      />,
    );
    const [a, b] = screen.getAllByRole('button');
    fireEvent.click(a);
    expect(a.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(b);
    expect(a.getAttribute('aria-expanded')).toBe('false');
    expect(b.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('KazTabs', () => {
  it('navega com as setas e pula abas desabilitadas', () => {
    render(
      <Kaz.KazTabs
        label="Abas"
        items={[
          { id: '1', label: 'Um', content: 'P1' },
          { id: '2', label: 'Dois', content: 'P2', disabled: true },
          { id: '3', label: 'Três', content: 'P3' },
        ]}
      />,
    );
    const first = screen.getByRole('tab', { name: 'Um' });
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Três' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toBe('P3');
  });
});

describe('KazModal', () => {
  it('fecha com Escape', () => {
    const onClose = vi.fn();
    render(
      <Kaz.KazModal open onClose={onClose} title="Título">
        Corpo
      </Kaz.KazModal>,
    );
    expect(screen.getByRole('dialog', { name: 'Título' })).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});

describe('KazDropdown', () => {
  it('abre, seleciona e fecha', () => {
    const onSelect = vi.fn();
    render(<Kaz.KazDropdown label="Ações" items={[{ label: 'Editar', onSelect }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ações' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Editar' }));
    expect(onSelect).toHaveBeenCalled();
    expect(screen.queryByRole('menu')).toBeNull();
  });
});

describe('KazAutocomplete', () => {
  it('filtra e escolhe com o teclado', () => {
    const onSelect = vi.fn();
    render(
      <Kaz.KazAutocomplete
        label="Buscar"
        onSelect={onSelect}
        options={[
          { id: '1', label: 'Grid' },
          { id: '2', label: 'Tipografia' },
        ]}
      />,
    );
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'gri' } });
    expect(screen.getAllByRole('option')).toHaveLength(1);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
  });
});

describe('KazCalendar', () => {
  it('seleciona período em dois cliques', () => {
    function Harness() {
      const [range, setRange] = useState<Kaz.KazDateRange>({ start: null, end: null });
      return (
        <>
          <Kaz.KazCalendar mode="range" value={range} onChange={setRange} defaultMonth={new Date(2026, 0, 1)} />
          <output>{range.end ? `${range.start!.getDate()}-${range.end.getDate()}` : ''}</output>
        </>
      );
    }
    render(<Harness />);
    const fmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' });
    fireEvent.click(screen.getByRole('button', { name: fmt.format(new Date(2026, 0, 5)) }));
    fireEvent.click(screen.getByRole('button', { name: fmt.format(new Date(2026, 0, 9)) }));
    expect(document.querySelector('output')!.textContent).toBe('5-9');
  });
});

describe('KazSlider', () => {
  it('mantém o mínimo menor que o máximo no intervalo', () => {
    const onChange = vi.fn();
    render(<Kaz.KazSlider aria-label="Idade" defaultValue={[20, 40]} onChange={onChange} />);
    const [low] = screen.getAllByRole('slider');
    fireEvent.change(low, { target: { value: '60' } });
    expect(onChange).toHaveBeenCalledWith([40, 40]);
  });
});

describe('KazTooltip', () => {
  it('abre no foco após o atraso', () => {
    vi.useFakeTimers();
    render(
      <Kaz.KazTooltip content="Dica" delay={100}>
        <button>Alvo</button>
      </Kaz.KazTooltip>,
    );
    fireEvent.focus(screen.getByRole('button'));
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole('button').getAttribute('aria-describedby')).toBe(screen.getByRole('tooltip').id);
    vi.useRealTimers();
  });
});

describe('utilitários', () => {
  it('getPageRange insere reticências', () => {
    expect(getPageRange(10, 20, 1)).toEqual([1, 'gap', 9, 10, 11, 'gap', 20]);
    expect(getPageRange(1, 5, 1)).toEqual([1, 2, 3, 4, 5]);
  });
  it('getInitials', () => {
    expect(getInitials('Victor Silvestre')).toBe('VS');
    expect(getInitials('ana')).toBe('A');
  });
});

describe('renderização básica', () => {
  it('renderiza os demais componentes sem erro', () => {
    render(
      <Kaz.KazProvider theme="dark">
        <Kaz.KazAlert title="Oi" />
        <Kaz.KazBadge>Novo</Kaz.KazBadge>
        <Kaz.KazBreadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Agora' }]} />
        <Kaz.KazCheckbox label="C" />
        <Kaz.KazSwitch label="S" />
        <Kaz.KazRadioGroup name="r" label="R" options={[{ value: '1', label: 'Um' }]} />
        <Kaz.KazSelect label="Sel" options={[{ value: '1', label: 'Um' }]} />
        <Kaz.KazTextarea label="T" />
        <Kaz.KazPagination page={1} totalPages={3} onChange={() => undefined} summary={{ pageSize: 10, total: 25 }} />
        <Kaz.KazProgress value={50} label="P" />
        <Kaz.KazSpinner />
        <Kaz.KazTable columns={[{ key: 'a', header: 'A' }]} data={[{ a: 1 }]} />
        <Kaz.KazAvatar name="Ana" />
        <Kaz.KazTopbar brand="bloo" user={{ name: 'Ana' }} />
        <Kaz.KazSidebar sections={[{ items: [{ id: 'a', label: 'A', children: [{ id: 'b', label: 'B', active: true }] }] }]} />
        <Kaz.KazCarousel label="C" slides={[{ id: '1', content: 'Um' }, { id: '2', content: 'Dois' }]} />
        <Kaz.KazSparkline data={[1, 3, 2]} label="Tendência" />
        <Kaz.KazDivider label="ou" />
        <Kaz.KazListGroup items={[{ label: 'Item' }]} />
        <Kaz.KazDatepicker value={null} onChange={() => undefined} label="Data" />
        <Kaz.KazIcon name="heart" />
      </Kaz.KazProvider>,
    );
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('50');
    expect(screen.getByText(/Mostrando/).textContent).toContain('1 a 10 de 25');
  });
});

describe('KazIcon', () => {
  it('aplica o tamanho informado por cima do 1em padrão', () => {
    const { container } = render(<Kaz.KazIcon name="heart" size={48} />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.width).toBe('48px');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});
