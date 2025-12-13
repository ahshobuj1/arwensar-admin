import {useStatsQuery} from '@/features/stats/statsApi';
import {HealthCard} from './HealthCard';
import {SectionCards} from './SectionCard';
import {VendorsByIndustryChart} from './_chart/VendorsByIndustryChart';
import {RiskDistributionChart} from './_chart/RiskDistributionChart';
import {ProblemsPriorityChart} from './_chart/ProblemsPriorityChart';
// import {ProblemsPriorityChart} from './_chart/ProblemsPriorityChart';

export default function Dashboard() {
  const {data, isLoading, isError} = useStatsQuery(undefined);

  if (isLoading) return <div className="p-6">Loading dashboard...</div>;
  if (isError || !data?.data)
    return <div className="p-6 text-red-500">Failed to load dashboard</div>;

  const dashboard = data?.data;

  // console.log(dashboard);

  return (
    <div className="p-6">
      <div className="@container/main flex flex-1 flex-col gap-6">
        {/*  KPI Cards */}
        <SectionCards overview={dashboard.overview} />

        {/*  System Health */}
        <h2 className="text-primary text-3xl font-semibold mt-4">
          System Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HealthCard
            title="Completion Rate"
            value={`${dashboard.systemHealth.assessmentCompletionRate}%`}
          />
          <HealthCard
            title="Average Risk Score"
            value={dashboard.systemHealth.averageRiskScore}
            variant="danger"
          />
          <HealthCard
            title="Compliance Rate"
            value={`${dashboard.systemHealth.complianceRate}%`}
            variant="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VendorsByIndustryChart
            data={dashboard?.breakdown?.vendorsByIndustry}
          />
          <RiskDistributionChart
            submissions={dashboard?.recentActivity?.submissions}
          />
        </div>

        <ProblemsPriorityChart problems={dashboard?.recentActivity?.problems} />
      </div>
    </div>
  );
}
