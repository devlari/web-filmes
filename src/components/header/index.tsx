import { Menubar } from 'primereact/menubar';
import { ThemeSwitcher } from '../switch-theme';
import Image from 'next/image';
import { Button } from 'primereact/button';

export function Header() {
  const start = (
    <div className="flex items-center gap-2">
      <Image
        src="/header/imgs/CubosLogo.png"
        alt="Logo"
        width={120}
        height={40}
        priority
      />
      <span className="text-lg font-semibold">Movies</span>
    </div>
  );

  const end = (
    <div className="flex items-center gap-2">
      <ThemeSwitcher />
      <Button label="Logout" icon="pi pi-sign-out" />
    </div>
  );

  return (
    <header>
      <Menubar start={start} end={end} />
    </header>
  );
}
