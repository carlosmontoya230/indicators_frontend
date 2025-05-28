import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function NavMenu() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="nav-menu">
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#quienes-somos">
            Quiénes somos
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#servicios">Servicios</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#estructura">
            Estructura
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#equipo">Equipo</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
