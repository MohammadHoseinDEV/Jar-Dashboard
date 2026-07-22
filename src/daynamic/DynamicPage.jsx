import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// AdminPages
const AdminMenus = lazy(
  () => import('../features/dashboard/pages/admin/menu/AdminMenus')
);
const AdminRoles = lazy(
  () => import('../features/dashboard/pages/admin/role/AdminRoles')
);
const AdminUsers = lazy(
  () => import('../features/dashboard/pages/admin/users/AdminUsers')
);
const AdminEducation = lazy(
  () => import('../features/dashboard/pages/admin/education/AdminEducation')
);
const AdminJobPosition = lazy(
  () => import('../features/dashboard/pages/admin/jobPosition/AdminJobPosition')
);
const AdminOrganization = lazy(
  () =>
    import('../features/dashboard/pages/admin/organization/AdminOrganization')
);
const AdminShift = lazy(
  () => import('../features/dashboard/pages/admin/shift/AdminShift')
);
const AdminUnits = lazy(
  () => import('../features/dashboard/pages/admin/unit/AdminUnits')
);

// ProductsPage
const CreateProducts = lazy(
  () => import('../features/product_wareHouse/pages/products/CreateProducts')
);

// Products Planing
const FinalLineChange = lazy(
  () => import('../features/products-planning/pages/FinalLineChange')
);

// Work Reports
const MachiningWorkReport = lazy(
  () =>
    import('../features/work-Report/pages/MachiningWorkReport/MachiningWorkReport')
);
const MechanicalReport = lazy(
  () => import('../features/work-Report/pages/Mechanical/MechanicalReport')
);
const FacilityReport = lazy(
  () => import('../features/work-Report/pages/Facility/FacilityReport')
);
const PolishingReport = lazy(
  () => import('../features/work-Report/pages/Polishing/PolishingReport')
);
const QualityControl = lazy(
  () =>
    import('../features/work-Report/pages/QualityControl & Package/QualityControl')
);

// Advanced Reports
const PersonnelReports = lazy(
  () => import('../features/advaned_reports/office/Pages/PersonnelReports')
);
const ElectricalReport = lazy(
  () => import('../features/work-Report/pages/Electrical/ElectricalReport')
);
const ProductionReport = lazy(
  () => import('../features/work-Report/pages/Production/ProductionReport')
);
const MechanicalBachplantReport = lazy(
  () =>
    import('../features/work-Report/pages/MechanicalBachPlant/MechanicalBachplantReport')
);
const BachplantReport = lazy(
  () => import('../features/work-Report/pages/Bachplant/BachplantReport')
);
const ElectricityUpsReport = lazy(
  () =>
    import('../features/electricity/Pages/electricityUPS/ElectricityUpsReport')
);
const DailyAmpReport = lazy(
  () => import('../features/electricity/Pages/dailyAmp/DailyAmpReport')
);
const ControlChecklistReport = lazy(
  () =>
    import('../features/electricity/Pages/controlChecklist/ControlChecklistReport')
);
const EarthWellReport = lazy(
  () => import('../features/electricity/Pages/earthWell/EarthWellReport')
);
const WeeklyAmpReport = lazy(
  () => import('../features/electricity/Pages/dailyAmpWeekly/WeeklyAmpReport')
);
const BiWeeklyAmpReport = lazy(
  () => import('../features/electricity/Pages/BiWeeklyAmp/BiWeeklyAmpReport')
);
// 5271
const DesignDataForm = lazy(
  () => import('../features/mold-design/Pages/designDataForm/DesignDataForm')
);
const MoldDarwingForm = lazy(
  () => import('../features/mold-design/Pages/moldDarwingForm/MoldDarwingForm')
);
const ProductWeightStandardForm = lazy(
  () =>
    import('../features/mold-design/Pages/productsWeightStandardForm/ProductWeightStandardForm')
);
const InternalDesignPhasePlanning = lazy(
  () =>
    import('../features/mold-design/Pages/internalDesign/InternalDesignPhasePlanning')
);
const DesignPhasePlanning = lazy(
  () =>
    import('../features/mold-design/Pages/designPhasePlanning/DesignPhasePlanning')
);

const DesignWorkRequest = lazy(
  () =>
    import('../features/mold-design/Pages/designWorkRequest/DesignWorkRequest')
);
const DesignMeeting = lazy(
  () => import('../features/mold-design/Pages/designMeeting/Designmeeting')
);

const MoldFieldValidation = lazy(
  () =>
    import('../features/mold-design/Pages/moldFieldValidation/MoldFieldValidation')
);

const pagesMap = {
  'admin-menus': AdminMenus,
  'admin-units': AdminUnits,
  'admin-roles': AdminRoles,
  'admin-user': AdminUsers,
  'admin-educations': AdminEducation,
  'admin-job-position': AdminJobPosition,
  'admin-organization': AdminOrganization,
  'admin-shift': AdminShift,
  'production-report': ProductionReport,

  // Work Reports
  'machining-report': MachiningWorkReport,
  'mecanicalBachplant-report': MechanicalBachplantReport,
  'mechanical-report': MechanicalReport,
  'facility-report': FacilityReport,
  'polishing-report': PolishingReport,
  'qualitycontrol&package-report': QualityControl,
  'electrical-report': ElectricalReport,
  'bachplant-report': BachplantReport,

  // 5273
  'upsBatteryVoltage-report': ElectricityUpsReport,
  'DailyAmp-report': DailyAmpReport,
  'controlChecklist-report': ControlChecklistReport,
  'visit-earthWell': EarthWellReport,
  'weekly-amp': WeeklyAmpReport,
  'biweekly-amp': BiWeeklyAmpReport,

  // ProductsPage
  'definition-of-product': CreateProducts,

  // Products Planing
  'final-notification-of-line-change': FinalLineChange,

  // Advanced Reports
  'personnel-reports': PersonnelReports,

  // 5271
  'design-data-and-drawing-verification-form': DesignDataForm,
  'mold-drawing-verification-form': MoldDarwingForm,
  'product-weight-standard-form': ProductWeightStandardForm,
  'internal-design-phase-planning': InternalDesignPhasePlanning,
  'design-phase-planning': DesignPhasePlanning,
  'design-work-request-form': DesignWorkRequest,
  'design-meeting': DesignMeeting,
  'mold-field-validation-form': MoldFieldValidation,
};

export default function DynamicPage() {
  const { page } = useParams();
  const PageComponent = pagesMap[page];

  if (!PageComponent) return <div>صفحه پیدا نشد</div>;

  return <PageComponent />;
}
