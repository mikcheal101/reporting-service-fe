export default interface ILink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}