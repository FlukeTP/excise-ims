
package th.go.excise.ims.ia.persistence.repository;

import java.math.BigDecimal;
import java.util.List;

import th.co.baiwa.buckwaframework.common.persistence.repository.CommonJpaCrudRepository;
import th.go.excise.ims.ia.persistence.entity.IaStampFile;

public interface IaStampFileRepository extends CommonJpaCrudRepository<IaStampFile, BigDecimal> {

	List<IaStampFile> findByDetailId(BigDecimal bigDecimal);

}
