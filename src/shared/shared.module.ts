import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { PasswordModule } from 'primeng/password';
import { StepsModule } from 'primeng/steps';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { FullCalendarModule } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';

const ANGULAR_MODULES = [CommonModule, ReactiveFormsModule, FormsModule];

const PRIMENG_MODULES = [
    PanelModule,
    InputMaskModule,
    FieldsetModule,
    ChipModule,
    FullCalendarModule,
    AccordionModule,
    BadgeModule,
    SelectButtonModule,
    DialogModule,
    FileUploadModule,
    MultiSelectModule,
    StepsModule,
    AvatarModule,
    ProgressSpinnerModule,
    SkeletonModule,
    TagModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    SidebarModule,
    InputTextModule,
    InputSwitchModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    DividerModule,
    DataViewModule,
    TableModule,
    TreeModule,
    MenubarModule,
    TabMenuModule,
    ContextMenuModule,
    OverlayPanelModule,
    MenuModule,
    TooltipModule,
    BreadcrumbModule,
    RadioButtonModule,
    KeyFilterModule,
    InputNumberModule,
    PasswordModule,
];

const MODULES = [...ANGULAR_MODULES, ...PRIMENG_MODULES];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
})
export class SharedModule {}
