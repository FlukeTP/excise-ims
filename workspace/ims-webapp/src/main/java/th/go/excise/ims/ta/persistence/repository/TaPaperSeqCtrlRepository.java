package th.go.excise.ims.ta.persistence.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import th.co.baiwa.buckwaframework.common.constant.CommonConstants.FLAG;
import th.co.baiwa.buckwaframework.common.persistence.repository.CommonJpaCrudRepository;
import th.go.excise.ims.ta.persistence.entity.TaPaperSeqCtrl;

public interface TaPaperSeqCtrlRepository extends CommonJpaCrudRepository<TaPaperSeqCtrl, Long> {

	@Query("select e from #{#entityName} e where e.isDeleted = '" + FLAG.N_FLAG + "' and e.officeCode = :officeCode and e.budgetYear = :budgetYear and e.runningType = :runningType")
	public TaPaperSeqCtrl findByOfficeCodeAndBudgetYearAndRunningType(@Param("officeCode") String officeCode, @Param("budgetYear") String budgetYear, @Param("runningType") String runningType);

}
